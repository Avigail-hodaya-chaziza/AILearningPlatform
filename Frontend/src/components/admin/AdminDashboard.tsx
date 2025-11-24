import React, { useState, useEffect } from 'react';
import { UsersList } from './UsersList';
import { AllPromptsHistory } from './AllPromptsHistory';
import { CategoryManagement } from './CategoryManagement';
import { adminService } from '../../services/AdminService';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import type { AdminView, AppStats } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentView === 'dashboard') {
      loadStats();
    }
  }, [currentView]);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getStats();
      setStats(data);
    } catch (err: any) {
      setError('שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UsersList />;
      case 'prompts':
        return <AllPromptsHistory />;
      case 'categories':
        return <CategoryManagement />;
      default:
        if (loading) return <Loading message="טוען סטטיסטיקות..." />;
        if (error) return <ErrorMessage message={error} onClose={() => setError(null)} />;
        if (!stats) return <div>אין נתונים</div>;

        return (
          <div className="admin-stats">
            <h2>📊 סטטיסטיקה</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>👥 משתמשים רשומים</h3>
                <button className="stat-number" onClick={() => setCurrentView('users')}>{stats.totalUsers}</button>
              </div>
              <div className="stat-card">
                <h3>💬 בנק שאלות</h3>
                <button className="stat-number" onClick={() => setCurrentView('prompts')}>{stats.totalPrompts}</button>
              </div>
              <div className="stat-card">
                <h3>📅 שאלות שנשאלו היום</h3>
                <button className="stat-number" onClick={() => setCurrentView('prompts')}>{stats.todayPrompts}</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🛠️ פאנל ניהול</h1>
        <nav className="admin-nav">
          <button 
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentView('dashboard')}
          >
            📊 לוח נתונים
          </button>
          <button 
            className={currentView === 'users' ? 'active' : ''}
            onClick={() => setCurrentView('users')}
          >
            👥 משתמשים
          </button>
          <button 
            className={currentView === 'prompts' ? 'active' : ''}
            onClick={() => setCurrentView('prompts')}
          >
            💬 שאלות
          </button>
          <button 
            className={currentView === 'categories' ? 'active' : ''}
            onClick={() => setCurrentView('categories')}
          >
            📁 קטגוריות
          </button>
        </nav>
      </div>
      
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};
