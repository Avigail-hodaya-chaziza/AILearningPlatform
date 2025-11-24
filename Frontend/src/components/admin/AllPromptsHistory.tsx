import React, { useState, useEffect } from 'react';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { adminService } from '../../services/AdminService';
import type { AdminPromptView } from '../../types';

export const AllPromptsHistory: React.FC = () => {
  const [prompts, setPrompts] = useState<AdminPromptView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadAllPrompts();
  }, []);

  const loadAllPrompts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminService.getAllPrompts();
      setPrompts(data);
    } catch (err: any) {
      setError('שגיאה בטעינת היסטוריית הפרומפטים');
    } finally {
      setLoading(false);
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = 
      prompt.promptText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.userPhone?.includes(searchTerm);
    
    const matchesCategory = 
      selectedCategory === '' || prompt.categoryName === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(prompts.map(p => p.categoryName))];

  if (loading) return <Loading message="טוען היסטוריית פרומפטים..." />;

  return (
    <div className="all-prompts-history">
      <div className="list-header">
        <h2>💬 בנק שאלות({prompts.length})</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="חפש לפי תוכן, משתמש או טלפון..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=""> קטגוריות</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <div className="prompts-list">
        {filteredPrompts.map(prompt => (
          <div key={prompt.id} className="prompt-card">
            <div className="prompt-header">
              <div className="user-info">
                <strong>{prompt.userName}</strong> ({prompt.userPhone})
              </div>
              <div className="prompt-meta">
                <span className="category">{prompt.categoryName} → {prompt.subCategoryName}</span>
                <span className="date">{new Date(prompt.createdAt).toLocaleString('he-IL')}</span>
              </div>
            </div>
            
            <div className="prompt-content">
              <div className="question">
                <strong>שאלה:</strong>
                <p>{prompt.promptText}</p>
              </div>
              <div className="answer">
                <strong>תשובה:</strong>
                <p>{prompt.response.length > 200 
                    ? `${prompt.response.substring(0, 200)}...` 
                    : prompt.response}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="no-results">
            <p>לא נמצאו פרומפטים התואמים לחיפוש</p>
          </div>
        )}
      </div>
    </div>
  );
};
