import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import type { CategorySelectorProps, Category, SubCategory } from '../../types';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectionChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // טעינת קטגוריות בהתחלה
  useEffect(() => {
    loadCategories();
  }, []);

  // טעינת תת-קטגוריות כשבוחרים קטגוריה
  useEffect(() => {
    if (selectedCategory > 0) {
      loadSubCategories(selectedCategory);
    } else {
      setSubCategories([]);
      setSelectedSubCategory(0);
    }
  }, [selectedCategory]);

  // עדכון ההורה כשיש בחירה מלאה
  useEffect(() => {
    if (selectedCategory > 0 && selectedSubCategory > 0) {
      onSelectionChange(selectedCategory, selectedSubCategory);
    }
  }, [selectedCategory, selectedSubCategory, onSelectionChange]);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
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
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getSubCategories(categoryId);
      setSubCategories(data);
    } catch (err: any) {
      setError('שגיאה בטעינת תת-הקטגוריות');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="טוען קטגוריות..." />;

  return (
    <div className="category-selector">
      <h3>בחר קטגוריה ותת-קטגוריה</h3>
      
      <div className="selectors">
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

        <select 
          value={selectedSubCategory} 
          onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
          disabled={subCategories.length === 0}
        >
          <option value={0}>בחר תת-קטגוריה</option>
          {subCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </div>
  );
};
