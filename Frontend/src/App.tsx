import React, { useState, useEffect } from 'react';
import { userService } from './services/userService';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
// קטגוריות הוסרו מהתפריט העליון (ייבוא הוסר)
import './App.css';

type AppMode = 'user' | 'admin'; // הסרת מצב קטגוריות מהתפריט

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('user');
  const [jwtStatus, setJwtStatus] = useState<string>(''); // נשמרת לעתיד אם נרצה התראה רקע, אפשר למחוק לגמרי אם לא צריך

  // אוטו-לוגין: אם אין טוקן אבל יש userPhone שמור ננסה ליצור סשן
  useEffect(() => {
    (async () => {
      await userService.ensureSession();
    })();
  }, []);

  // בדיקה אוטומטית של תוקף הטוקן כל דקה
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const now = Date.now() / 1000;
          const timeLeft = payload.exp - now;
          
          // אם נשארו פחות מ-2 דקות, הצג אזהרה
          if (timeLeft < 120 && timeLeft > 0) {
            setJwtStatus(`⚠️ הטוקן יפוג בעוד ${Math.floor(timeLeft / 60)} דקות`);
          } else if (timeLeft <= 0) {
            setJwtStatus('❌ הטוקן פג תוקף - נדרש התחברות מחדש');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Error checking token:', error);
        }
      }
    };

    // בדיקה ראשונית
    checkTokenExpiry();
    
    // בדיקה כל דקה
    const interval = setInterval(checkTokenExpiry, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // פונקציית בדיקת JWT הוסרה לפי בקשתך; ניתן לשחזר אם תרצה בעתיד.

  return (
    <div className="App">
      {/* כפתור החלפה בין משתמש לאדמין */}
      <div className="mode-switcher">
        <button 
          className={currentMode === 'user' ? 'active' : ''}
          onClick={() => setCurrentMode('user')}
        >
          👤 משתמש
        </button>
        <button 
          className={currentMode === 'admin' ? 'active' : ''}
          onClick={() => setCurrentMode('admin')}
        >
          🛠️ מנהל
        </button>
        {/* כפתור בדיקת JWT הוסר */}
      </div>
      
      {jwtStatus && (
        <div style={{padding: '10px', margin: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '5px'}}>
          {jwtStatus}
        </div>
      )}

      {/* הצגת העמוד המתאים */}
      {currentMode === 'user' && <Dashboard />}
      {currentMode === 'admin' && <AdminPanel />}
      {/* הסרנו הצגת CategoryManagement כי אין כפתור גישה */}
    </div>
  );
}

export default App;
