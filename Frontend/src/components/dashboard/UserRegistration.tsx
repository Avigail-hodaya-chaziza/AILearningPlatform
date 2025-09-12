import React, { useState } from 'react';
import { userService } from '../../services/userService';
import type { UserRegistrationProps, UserRequest } from '../../types';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';



export const UserRegistration: React.FC<UserRegistrationProps> = ({ onUserRegistered }) => {
  const [formData, setFormData] = useState<UserRequest>({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await userService.registerUser(formData);
      onUserRegistered(user.id, user.name);
      setFormData({ name: '', phone: '' });
    } catch (err: any) {
      setError(err.response?.data || 'שגיאה ברישום המשתמש');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="רושם משתמש..." />;

  return (
    <div className="user-registration">
      <h2>הרשמה למערכת</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="שם מלא"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="מספר טלפון"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
        <button type="submit">הרשמה</button>
      </form>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  );
};
