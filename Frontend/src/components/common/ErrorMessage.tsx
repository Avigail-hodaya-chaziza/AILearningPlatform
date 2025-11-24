import React from 'react';
import type { ErrorMessageProps } from '../../types';



export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="error-message">
      <span className="error-text">❌ {message}</span>
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};
