import React from 'react';
import type { LoadingProps } from '../../types';


export const Loading: React.FC<LoadingProps> = ({ message = 'טוען...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};
