const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let recipes = [];

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/api/recipes', (req, res) => {
  const recipe = { id: uuidv4(), ...req.body };
  recipes.push(recipe);
  res.json(recipe);
});

app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  recipes = recipes.filter(recipe => recipe.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.put('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;
  recipes = recipes.map(recipe => (recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe));
  res.json(updatedRecipe);
});
