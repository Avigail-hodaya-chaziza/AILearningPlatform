# 🤖 AI Learning Platform

פלטפורמת לימוד אינטראקטיבית עם בינה מלאכותית המאפשרת למשתמשים לשאול שאלות ולקבל תשובות מותאמות אישית לפי קטגוריות שונות.

## 🚀 טכנולוגיות

### Frontend
- **React 19** - ספריית UI
- **TypeScript** - שפת תכנות מתקדמת
- **Vite** - כלי build מהיר
- **Axios** - תקשורת HTTP

### Backend
- **ASP.NET Core** - API Server
- **Entity Framework** - ORM
- **SQL Server** - בסיס נתונים
- **OpenAI API** - בינה מלאכותית
- **JWT** - אימות משתמשים
- **Serilog** - לוגים

## 📋 דרישות מערכת

- **Node.js** 18+ 
- **.NET 8.0**
- **SQL Server** (LocalDB או מלא)
- **OpenAI API Key**

## ⚙️ התקנה

### 1. שכפול הפרוייקט
```bash
git clone [repository-url]
cd AILearningPlatform


Copy

Insert at cursor
2. הגדרת Backend
cd AILearningPlatform/Api
dotnet restore
dotnet ef database update
dotnet run

Copy

Insert at cursor
bash
3. הגדרת Frontend
cd AILerningPlatform_Frontend/AILerningPlatform_Frontend
npm install
npm run dev

Copy

Insert at cursor
bash
🔧 קובץ Environment
Backend - appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=AILearningDB;Trusted_Connection=true;"
  },
  "OpenAI": {
    "ApiKey": "YOUR_OPENAI_API_KEY_HERE"
  },
  "JwtSettings": {
    "Secret": "YOUR_JWT_SECRET_KEY_HERE",
    "Issuer": "AILearningPlatform",
    "Audience": "AILearningUsers"
  }
}

Copy

Insert at cursor
json
Frontend - .env
VITE_API_BASE_URL=http://localhost:5215/api
VITE_DEV_PORT=5173

Copy

Insert at cursor
env
🎯 תכונות
👤 משתמש רגיל
✅ רישום למערכת (שם + טלפון)

✅ בחירת קטגוריה ותת-קטגוריה

✅ שליחת שאלות ל-AI

✅ קבלת תשובות מותאמות אישית

✅ צפייה בהיסטוריית השאלות

🛠️ מנהל מערכת
✅ לוח בקרה עם סטטיסטיקות

✅ רשימת כל המשתמשים

✅ צפייה בכל השאלות והתשובות

✅ חיפוש וסינון נתונים

🏗️ מבנה הפרוייקט
Frontend
src/
├── components/
│   ├── common/          # רכיבים כלליים
│   ├── dashboard/       # רכיבי משתמש
│   └── admin/          # רכיבי מנהל
├── pages/              # עמודים ראשיים
├── services/           # תקשורת API
├── types/              # TypeScript interfaces
└── config/             # הגדרות

Copy

Insert at cursor
Backend
├── Api/                # Controllers & Program.cs
├── Bl/                 # Business Logic & Services
└── Dal/                # Data Access Layer & Models

Copy

Insert at cursor
🌐 API Endpoints
משתמשים
POST /api/User/register - רישום משתמש חדש

קטגוריות
GET /api/Category - קבלת כל הקטגוריות

GET /api/Category/{id}/subcategories - תת-קטגוריות

פרומפטים
POST /api/Prompts/CreatePrompt - יצירת פרומפט חדש

GET /api/Prompts/GetUserHistory/{userId} - היסטוריית משתמש

🚀 הרצה
Development
# Backend (Terminal 1)
cd Api
dotnet run

# Frontend (Terminal 2)  
cd AILerningPlatform_Frontend/AILerningPlatform_Frontend
npm run dev

Copy

Insert at cursor
bash
URLs
Frontend: http://localhost:5173

Backend API: http://localhost:5215

Swagger: http://localhost:5215/swagger

🔒 אבטחה
JWT Authentication לאימות משתמשים

CORS מוגדר לפורט הפרונטאנד

Input Validation בכל הטפסים

Error Handling מקיף

📝 הנחות יסוד
OpenAI API Key נדרש לפעולת ה-AI

SQL Server זמין במערכת

CORS מוגדר ל-localhost בלבד (פיתוח)

JWT Secret צריך להיות חזק בסביבת ייצור

🤝 תרומה
Fork הפרוייקט

צור branch חדש (git checkout -b feature/amazing-feature)

Commit השינויים (git commit -m 'Add amazing feature')

Push ל-branch (git push origin feature/amazing-feature)

פתח Pull Request

📄 רישיון
הפרוייקט הזה הוא תחת רישיון MIT - ראה קובץ LICENSE לפרטים.

📞 יצירת קשר
מפתח: [השם שלך]

אימייל: [האימייל שלך]

GitHub: [הפרופיל שלך]

נבנה עם ❤️ באמצעות React, TypeScript ו-ASP.NET Core

