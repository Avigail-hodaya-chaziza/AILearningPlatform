import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import type { Category, SubCategory } from '../../types';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // טפסים
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategoryName, setNewSubCategoryName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory > 0) {
      loadSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError('שגיאה בטעינת הקטגוריות');
    } finally {
      setLoading(false);
    }
  };

  const loadSubCategories = async (categoryId: number) => {
    try {
      const data = await categoryService.getSubCategories(categoryId);
      setSubCategories(data);
    } catch (err: any) {
      setError('שגיאה בטעינת תת-הקטגוריות');
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    try {
      await categoryService.addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setSuccess('קטגוריה נוספה בהצלחה!');
      await loadCategories();
    } catch (err: any) {
      setError('שגיאה בהוספת הקטגוריה');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCategoryName.trim() || selectedCategory === 0) return;

    setLoading(true);
    try {
      await categoryService.addSubCategory(selectedCategory, newSubCategoryName.trim());
      setNewSubCategoryName('');
      setSuccess('תת-קטגוריה נוספה בהצלחה!');
      await loadSubCategories(selectedCategory);
    } catch (err: any) {
      setError('שגיאה בהוספת תת-הקטגוריה');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedCategories = async () => {
    setLoading(true);
    try {
      await categoryService.seedCategories();
      setSuccess('קטגוריות בסיסיות נוצרו בהצלחה!');
      await loadCategories();
    } catch (err: any) {
      setError('שגיאה ביצירת קטגוריות בסיסיות');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="טוען..." />;

  return (
    <div className="category-management">
      <h2>ניהול קטגוריות</h2>

      {/* יצירת קטגוריות בסיסיות */}
      <section className="seed-section">
        <h3>יצירת קטגוריות בסיסיות</h3>
        <button onClick={handleSeedCategories} className="seed-btn">
          צור קטגוריות בסיסיות
        </button>
      </section>

      {/* הוספת קטגוריה חדשה */}
      <section className="add-category-section">
        <h3>הוספת קטגוריה חדשה</h3>
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            placeholder="שם הקטגוריה"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
          <button type="submit">הוסף קטגוריה</button>
        </form>
      </section>

      {/* הוספת תת-קטגוריה */}
      <section className="add-subcategory-section">
        <h3>הוספת תת-קטגוריה</h3>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
        >
          <option value={0}>בחר קטגוריה</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {selectedCategory > 0 && (
          <form onSubmit={handleAddSubCategory}>
            <input
              type="text"
              placeholder="שם תת-הקטגוריה"
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              required
            />
            <button type="submit">הוסף תת-קטגוריה</button>
          </form>
        )}
      </section>

      {/* רשימת קטגוריות קיימות */}
      <section className="existing-categories">
        <h3>קטגוריות קיימות</h3>
        <div className="categories-list">
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <div className="category-header">
                <h4>{category.name}</h4>
                <button 
                  className="add-sub-btn"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    loadSubCategories(category.id);
                  }}
                >
                  + הוסף תת-קטגוריה
                </button>
              </div>
              
              {selectedCategory === category.id && (
                <div className="subcategory-section">
                  <form onSubmit={handleAddSubCategory} className="inline-form">
                    <input
                      type="text"
                      placeholder="שם תת-הקטגוריה"
                      value={newSubCategoryName}
                      onChange={(e) => setNewSubCategoryName(e.target.value)}
                      required
                    />
                    <button type="submit">הוסף</button>
                    <button type="button" onClick={() => setSelectedCategory(0)}>ביטול</button>
                  </form>
                  
                  {subCategories.length > 0 && (
                    <ul className="subcategories-list">
                      {subCategories.map(sub => (
                        <li key={sub.id}>{sub.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      {success && (
        <div className="success-message">
          {success}
          <button onClick={() => setSuccess(null)}>×</button>
        </div>
      )}
    </div>
  );
};