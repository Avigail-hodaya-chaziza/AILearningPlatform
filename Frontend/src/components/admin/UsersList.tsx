import React, { useState, useEffect } from 'react';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { adminService } from '../../services/AdminService';
import type { AdminUserView } from '../../types';

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<AdminUserView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError('שגיאה בטעינת רשימת המשתמשים');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  if (loading) return <Loading message="טוען רשימת משתמשים..." />;

  return (
    <div className="users-list">
      <div className="list-header">
        <h2>👥 רשימת משתמשים ({users.length})</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="חפש לפי שם או טלפון..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>שם</th>
              <th>טלפון</th>
              <th>תאריך הרשמה</th>
              <th>סה"כ פרומפטים</th>
              <th>פעילות אחרונה</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.registrationDate).toLocaleDateString('he-IL')}</td>
                <td>{user.totalPrompts}</td>
                <td>{new Date(user.lastActivity).toLocaleDateString('he-IL')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-results">
            <p>לא נמצאו משתמשים התואמים לחיפוש</p>
          </div>
        )}
      </div>
    </div>
  );
};
