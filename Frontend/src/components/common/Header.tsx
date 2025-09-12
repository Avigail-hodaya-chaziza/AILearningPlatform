import React from 'react';
import type { HeaderProps } from '../../types';


export const Header: React.FC<HeaderProps> = ({ currentUser, isAdmin }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>🤖 AI Learning Platform</h1>
        <nav>
          {currentUser ? (
            <div className="user-info">
              <span>שלום, {currentUser}</span>
              {isAdmin && <span className="admin-badge">אדמין</span>}
            </div>
          ) : (
            <span></span>
          )}
        </nav>
      </div>
    </header>
  );
};
