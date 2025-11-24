import React, { useState } from 'react';
import { promptService } from '../../services/promptService';
import type { PromptFormProps, PromptRequest } from '../../types';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const PromptForm: React.FC<PromptFormProps> = ({ 
  userId, 
  categoryId, 
  subCategoryId, 
  onPromptSubmitted 
}) => {
  const [promptText, setPromptText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promptText.trim()) {
      setError('אנא כתוב שאלה');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const promptData: PromptRequest = {
        userId,
        categoryId,
        subCategoryId,
        promptText: promptText.trim()
      };

      const result = await promptService.createPrompt(promptData);
      onPromptSubmitted(result.response); // שולח התשובה להורה
      setPromptText(''); // מנקה את הטופס
    } catch (err: any) {
      const serverPayload = err.response?.data;
      const friendly = typeof serverPayload === 'string'
        ? serverPayload
        : serverPayload?.message || err.userMessage || 'שגיאה בשליחת השאלה';
      setError(friendly);
    } finally {
      setLoading(false);
    }
  };

  // אם אין משתמש או קטגוריה - לא מציג את הטופס
  if (!userId || !categoryId || !subCategoryId) {
    return (
      <div className="prompt-form-disabled">
        <p>📝 אנא השלם רישום ובחירת קטגוריה כדי לשלוח שאלה</p>
      </div>
    );
  }

  if (loading) return <Loading message="שולח שאלה ל-AI..." />;

  return (
    <div className="prompt-form">
      <h3>🤖 שאל את ה-AI</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="כתוב כאן את השאלה שלך..."
          rows={4}
          maxLength={1000}
        />
        <div className="form-footer">
          <span className="char-count">{promptText.length}/1000</span>
          <button type="submit" disabled={!promptText.trim()}>
            שלח שאלה
          </button>
        </div>
      </form>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  );
};
