// RecipeItem.js
import React from 'react';

const RecipeItem = ({ recipe, deleteRecipe, startEditing }) => {
  return (
    <div className="recipe-item">
      <h2>{recipe.title}</h2>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <button onClick={() => startEditing(recipe)}>Izmeni</button>
      <button onClick={() => deleteRecipe(recipe.id)}>Obrisi</button>
    </div>
  );
};

export default RecipeItem;
