import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  editCategory,
  selectCategories,
} from "../app/productivitySlice.js";

export default function CategorySelector({ selectedCategoryId, onSelectCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleAddCategory = useCallback(
    (event) => {
      event.preventDefault();
      const name = newCategory.trim();
      if (!name) return;
      dispatch(addCategory(name));
      setNewCategory("");
    },
    [dispatch, newCategory],
  );

  const beginEdit = useCallback((category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  }, []);

  const handleSaveCategory = useCallback(
    (event, categoryId) => {
      event.preventDefault();
      const name = editingName.trim();
      if (!name) return;
      dispatch(editCategory({ id: categoryId, name }));
      setEditingId(null);
      setEditingName("");
    },
    [dispatch, editingName],
  );

  const handleDeleteCategory = useCallback(
    (categoryId) => {
      dispatch(deleteCategory(categoryId));
      if (selectedCategoryId === categoryId) {
        onSelectCategory("uncategorized");
      }
      if (editingId === categoryId) {
        setEditingId(null);
      }
    },
    [dispatch, editingId, onSelectCategory, selectedCategoryId],
  );

  return (
    <aside className="sidebar" aria-label="Task categories">
      <div className="sidebar-heading">
        <p className="eyebrow">YOUR SPACE</p>
        <h2>Categories</h2>
      </div>

      <nav className="category-nav" aria-label="Filter tasks by category">
        <button
          className={selectedCategoryId === "all" ? "category-button selected" : "category-button"}
          type="button"
          aria-pressed={selectedCategoryId === "all"}
          onClick={() => onSelectCategory("all")}
        >
          <span className="category-dot all-dot" aria-hidden="true">✳</span>
          <span>All tasks</span>
        </button>
        {categories.map((category) => (
          <div className="category-row" key={category.id}>
            {editingId === category.id ? (
              <form
                className="category-edit-form"
                onSubmit={(event) => handleSaveCategory(event, category.id)}
              >
                <input
                  aria-label={`Rename ${category.name}`}
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  autoFocus
                />
                <button type="submit" aria-label="Save category name">✓</button>
                <button
                  type="button"
                  aria-label="Cancel category rename"
                  onClick={() => setEditingId(null)}
                >
                  ×
                </button>
              </form>
            ) : (
              <>
                <button
                  className={selectedCategoryId === category.id ? "category-button selected" : "category-button"}
                  type="button"
                  aria-pressed={selectedCategoryId === category.id}
                  onClick={() => onSelectCategory(category.id)}
                >
                  <span className={`category-dot dot-${categories.indexOf(category) % 4}`} aria-hidden="true" />
                  <span>{category.name}</span>
                </button>
                <div className="category-actions">
                  <button
                    type="button"
                    aria-label={`Rename ${category.name}`}
                    onClick={() => beginEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${category.name}`}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    ×
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        <button
          className={selectedCategoryId === "uncategorized" ? "category-button selected" : "category-button"}
          type="button"
          aria-pressed={selectedCategoryId === "uncategorized"}
          onClick={() => onSelectCategory("uncategorized")}
        >
          <span className="category-dot uncategorized-dot" aria-hidden="true">○</span>
          <span>Uncategorized</span>
        </button>
      </nav>

      <form className="new-category-form" onSubmit={handleAddCategory}>
        <label htmlFor="new-category">ADD A CATEGORY</label>
        <div>
          <input
            id="new-category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="e.g. Learning"
          />
          <button type="submit" disabled={!newCategory.trim()} aria-label="Add category">
            +
          </button>
        </div>
      </form>
      <p className="category-delete-note">Tasks in deleted categories move to Uncategorized.</p>
    </aside>
  );
}
