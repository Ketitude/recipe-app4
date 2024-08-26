// RecipeForm.js
import React, { useState, useEffect } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ addRecipe, editingRecipe, editRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setIngredients(editingRecipe.ingredients);
      setInstructions(editingRecipe.instructions);
      setImage(editingRecipe.image);
    }
  }, [editingRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = { title, ingredients, instructions, image };

    if (editingRecipe) {
      editRecipe(editingRecipe.id, recipe);
    } else {
      addRecipe(recipe);
    }

    setTitle('');
    setIngredients('');
    setInstructions('');
    setImage('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Naziv</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Sastojci</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <label>Uputstvo</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <label>URL slike</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">{editingRecipe ? 'Izmeni recpet' : 'Dodaj recept'}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
