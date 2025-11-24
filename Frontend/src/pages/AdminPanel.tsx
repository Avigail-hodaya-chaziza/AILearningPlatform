import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { loginAdmin } from "../services/AdminService";


export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ Name: '', PassWord: '', phoneNumber: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
  await loginAdmin(loginData.Name, loginData.PassWord, loginData.phoneNumber);

  // `loginAdmin` already saves the token to localStorage (adminToken) and returns stats.
  // Do not expect `token` on the returned AppStats object — read it from localStorage instead.
  const saved = localStorage.getItem('adminToken');
  console.log("SAVED TOKEN:", saved);
      setIsAuthenticated(true);
      setError("");

    } catch (err) {
      setError("שם משתמש או סיסמה שגויים");
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
              value={loginData.Name}
              onChange={(e) => setLoginData({ ...loginData, Name: e.target.value })}
              required
            />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="סיסמה"
                value={loginData.PassWord}
                onChange={(e) => setLoginData({ ...loginData, PassWord: e.target.value })}
                required
                style={{ paddingRight: '2em' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <input
              type="tel"
              placeholder="מספר טלפון"
              value={loginData.phoneNumber}
              onChange={(e) => setLoginData({ ...loginData, phoneNumber: e.target.value })}
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
