import axios from 'axios';

// פונקציית מיפוי שגיאות לוגיות להודעה קצרה למשתמש
function mapError(error: any): string {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const text = typeof data === 'string' ? data : (data?.message || data?.error || 'שגיאה לא צפויה');

  // בדיקות ספציפיות למפתחות / OpenAI / הרשאות
  if (status === 401) return 'לא מורשה – התחברות נדרשת.';
  if (status === 403) return 'גישה נדחתה.';
  if (status === 404) {
    if (/key|מפתח/i.test(text)) return 'המפתח לא זמין.';
    return 'לא נמצא.';
  }
  if (status === 409) return 'הפעולה מתנגשת עם נתונים קיימים.';
  if (status === 429) return 'יותר מדי בקשות – נסה בעוד רגע.';
  if (status >= 500) return 'שגיאת שרת – נא לנסות שוב מאוחר יותר.';

  // מקרים של רשת / timeout
  if (error.code === 'ECONNABORTED') return 'זמן בקשה הסתיים.';
  if (!error.response) return 'בעיה בחיבור לשרת.';

  // ברירת מחדל מקוצרת
  return text.length > 120 ? text.substring(0, 120) + '…' : text;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5215/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

// הוספת interceptor להוספת טוקן לבקשות
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken');
    // הסרנו שימוש בטוקן משתמש מ-localStorage; נשען על Cookie
    
    console.log('=== REQUEST DEBUG ===');
    console.log('Request URL:', config.url);
    console.log('Admin Token:', adminToken ? `exists (${adminToken.substring(0, 20)}...)` : 'missing');
    // console.log('User Token: cookie-based (HttpOnly)');
    console.log('All localStorage keys:', Object.keys(localStorage));
    
    if (config.url?.includes('Admin')) {
      // Don't attach Authorization for the login endpoint
      if (config.url.includes('/Admin/login')) {
        console.log('ℹ️ Skipping Authorization header for /Admin/login');
        return config;
      }
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
        console.log('✅ Using admin token for admin endpoint');
        console.log(localStorage.getItem('adminToken'));
      } else {
        console.log('❌ No admin token found for admin endpoint!');
      }
    }
    
    console.log('Final Authorization header:', config.headers.Authorization ? 'SET' : 'NOT SET');
    // Log the actual header value for debugging (temporary)
    try {
      console.log('Authorization header value:', config.headers.Authorization);
    } catch (e) {
      console.log('Authorization header value: <unavailable>');
    }
    console.log('===================');
    
    return config;
  },
  (error) => {
    console.error('[api.ts] Error in request interceptor:', error);
    return Promise.reject(error);
  }
);


  api.interceptors.response.use(
  (response) => response,
  (error) => {
    const userMessage = mapError(error);
    // לוג מפורט רק לקונסול, לא מוצג למשתמש
    console.error('API Error (normalized):', userMessage);
    // מצרפים הודעה ידידותית ל-throw
    return Promise.reject({ ...error, userMessage });
  }
);
