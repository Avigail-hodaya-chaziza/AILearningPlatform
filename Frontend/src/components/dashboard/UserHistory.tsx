import React, { useState, useEffect } from 'react';
import { promptService } from '../../services/promptService';
import type { UserHistoryProps, PromptResponse } from '../../types';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const UserHistory: React.FC<UserHistoryProps> = ({ userId, refreshTrigger }) => {
  const [history, setHistory] = useState<PromptResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId > 0) {
      loadHistory();
    }
  }, [userId, refreshTrigger]);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await promptService.getUserHistory(userId);
      setHistory(data);
    } catch (err: any) {
      setError('שגיאה בטעינת ההיסטוריה');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="user-history empty">
        <h3>📚 ההיסטוריה שלי</h3>
        <p>אנא הירשם כדי לראות את ההיסטוריה</p>
      </div>
    );
  }

  if (loading) return <Loading message="טוען היסטוריה..." />;

  return (
    <div className="user-history">
      <h3>📚 ההיסטוריה שלי</h3>
      
      {history.length === 0 ? (
        <p>עדיין לא שלחת שאלות</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="item-header">
                <span className="category">{item.categoryName} → {item.subCategoryName}</span>
                <span className="date">{new Date(item.createdAt).toLocaleDateString('he-IL')}</span>
              </div>
              <div className="item-content">
                <div className="question">
                  <strong>שאלה:</strong> {item.promptText}
                </div>
                <div className="answer">
                  <strong>תשובה:</strong> {item.response}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  );
};
