import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { UserRegistration } from '../components/dashboard/UserRegistration';
import { CategorySelector } from '../components/dashboard/CategorySelector';
import { PromptForm } from '../components/dashboard/PromptForm';
import { AIResponse } from '../components/dashboard/AIResponse';
import { UserHistory } from '../components/dashboard/UserHistory';
import type { User } from '../types';

export const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [historyRefresh, setHistoryRefresh] = useState<number>(0);

  const handleUserRegistered = (userId: number, userName: string) => {
    setCurrentUser({ id: userId, name: userName, phone: '' });
  };

  const handleCategorySelection = (categoryId: number, subCategoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(subCategoryId);
  };

  const handlePromptSubmitted = (response: string) => {
    setAiResponse(response);
    setHistoryRefresh(prev => prev + 1);
  };

  return (
    <div className="dashboard-page">
      <Header currentUser={currentUser?.name} isAdmin={false} />
      
      <main className="main-content">
        <div className="dashboard-container">
          <h1>🎓 פלטפורמת הלמידה עם AI</h1>
          
          {/* שלב 1: רישום */}
          {!currentUser && (
            <section className="registration-section">
              <UserRegistration onUserRegistered={handleUserRegistered} />
            </section>
          )}

          {/* שלב 2: בחירת קטגוריה */}
          {currentUser && (
            <section className="category-section">
              <CategorySelector onSelectionChange={handleCategorySelection} />
            </section>
          )}

          {/* שלב 3: שליחת פרומפט */}
          {currentUser && (
            <section className="prompt-section">
              <PromptForm
                userId={currentUser.id}
                categoryId={selectedCategory}
                subCategoryId={selectedSubCategory}
                onPromptSubmitted={handlePromptSubmitted}
              />
            </section>
          )}

          {/* שלב 4: תשובת AI */}
          {currentUser && (
            <section className="response-section">
              <AIResponse response={aiResponse} />
            </section>
          )}

          {currentUser && (
            <section className="history-section">
              <UserHistory 
                userId={currentUser.id} 
                refreshTrigger={historyRefresh}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
