import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('שם משתמש או סיסמה שגויים');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-form">
          <h2>🔐 כניסת מנהל</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="שם משתמש"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="סיסמה"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
            />
            <button type="submit">התחבר</button>
          </form>
          {error && <p className="error">{error}</p>}

        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Header currentUser="מנהל המערכת" isAdmin={true} />
      <main className="admin-main">
        <AdminDashboard />
      </main>
    </div>
  );
};
