import React, { useState } from 'react';
import { userService } from '../../services/userService';
import type { UserRegistrationProps, UserRequest } from '../../types';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';



export const UserRegistration: React.FC<UserRegistrationProps> = ({ onUserRegistered }) => {
  const [formData, setFormData] = useState<UserRequest>({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ניסיון רישום ראשון
      const user = await userService.registerUser(formData);
      // אם נרשם בהצלחה – טוקן אולי הגיע מה-Interceptor כ-cookie, אין token בגוף
      onUserRegistered(user.id, user.name);
      setFormData({ name: '', phone: '' });
      // שמירת מספר טלפון לזיהוי עתידי (אוטו-לוגין)
      localStorage.setItem('userPhone', user.phone);
    } catch (err: any) {
      // אם כבר רשום (409) – נבצע לוגין אוטומטי במקום להציג שגיאה
      const status = err.response?.status;
      if (status === 409) {
        try {
          const login = await userService.loginUser(formData.phone);
            // לא שומרים טוקן: נשען על HttpOnly Cookie שנוצר בצד השרת
          // שמירת מספר טלפון לזיהוי עתידי (אוטו-לוגין)
          localStorage.setItem('userPhone', login.phone);
          onUserRegistered(login.id, login.name);
          setFormData({ name: '', phone: '' });
          setError(null);
        } catch (loginErr: any) {
          const loginMessage = typeof loginErr.response?.data === 'string'
            ? loginErr.response.data
            : loginErr.response?.data?.title || loginErr.message || 'שגיאה בלוגין';
          setError(loginMessage);
        }
      } else {
        const errorMessage = err.userMessage || (typeof err.response?.data === 'string'
          ? err.response.data
          : err.response?.data?.title || err.message || 'שגיאה ברישום המשתמש');
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="רושם משתמש..." />;

  return (
    <div className="user-registration">
      <h2>הרשמה / כניסה</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="שם מלא"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="מספר טלפון"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
        <button type="submit">הרשמה / כניסה</button>
      </form>
      {error && <ErrorMessage message={String(error)} onClose={() => setError(null)} />}
    </div>
  );
};
