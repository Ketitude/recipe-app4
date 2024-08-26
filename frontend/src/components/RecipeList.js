// RecipeList.js
import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes, deleteRecipe, startEditing }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <p><strong>Sastojci:</strong> {recipe.ingredients}</p>
          <p><strong>Uputstvo:</strong> {recipe.instructions}</p>
          <div className="button-container">
            <button onClick={() => startEditing(recipe)}>Izmeni</button>
            <button onClick={() => deleteRecipe(recipe.id)}>Obrisi</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
