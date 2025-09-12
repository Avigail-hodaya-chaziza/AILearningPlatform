import React from 'react';

interface AIResponseProps {
  response: string | null;
  isLoading?: boolean;
}

export const AIResponse: React.FC<AIResponseProps> = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <div className="ai-response loading">
        <h3>🤖 AI מכין תשובה...</h3>
        <div className="typing-animation">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="ai-response empty">
        <h3>🤖 תשובת AI</h3>
        <p>התשובה תופיע כאן לאחר שליחת השאלה</p>
      </div>
    );
  }

  return (
    <div className="ai-response">
      <h3>🤖 תשובת AI</h3>
      <div className="response-content">
        <div className="response-text">
          {response.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="response-actions">
          <button onClick={() => navigator.clipboard.writeText(response)}>
            📋 העתק
          </button>
        </div>
      </div>
    </div>
  );
};
