// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import './App.css';
import './components/RecipeForm.css';
import './components/RecipeList.css'; // Dodaj ovaj import

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      console.log('Fetched recipes:', response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async (recipe) => {
    try {
      console.log('Sending recipe:', recipe);
      const response = await axios.post('http://localhost:5000/api/recipes', recipe);
      console.log('Response data:', response.data);
      setRecipes(prevRecipes => [...prevRecipes, response.data]);
      console.log('Updated recipes:', [...recipes, response.data]);
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe', error);
    }
  };

  const editRecipe = async (id, updatedRecipe) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
      setRecipes(prevRecipes => prevRecipes.map(recipe => (recipe.id === id ? response.data : recipe)));
      setEditingRecipe(null);
    } catch (error) {
      console.error('Error editing recipe', error);
    }
  };

  const startEditing = (recipe) => {
    setEditingRecipe(recipe);
  };

  return (
    <div className="App">
      <h1>Recepti</h1>
      <RecipeForm addRecipe={addRecipe} editingRecipe={editingRecipe} editRecipe={editRecipe} />
      <RecipeList recipes={recipes} deleteRecipe={deleteRecipe} startEditing={startEditing} />
    </div>
  );
};

export default App;
