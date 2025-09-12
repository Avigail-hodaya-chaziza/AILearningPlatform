import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import './App.css';

type AppMode = 'user' | 'admin';

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('user');

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
          🛠️ אדמין
        </button>
      </div>

      {/* הצגת העמוד המתאים */}
      {currentMode === 'user' ? <Dashboard /> : <AdminPanel />}
    </div>
  );
}

export default App;
