const express = require('express');
const router = express.Router();
const recipeModel = require('../models/recipe');

// Kreiranje novog recepta
router.post('/', (req, res) => {
  recipeModel.addRecipe(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
});

// Preuzimanje svih recepata
router.get('/', (req, res) => {
  recipeModel.getAllRecipes((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Preuzimanje recepta po ID-u
router.get('/:id', (req, res) => {
  recipeModel.getRecipeById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(row);
  });
});

// Ažuriranje recepta
router.put('/:id', (req, res) => {
  recipeModel.updateRecipe(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe updated' });
  });
});

// Brisanje recepta
router.delete('/:id', (req, res) => {
  recipeModel.deleteRecipe(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  });
});

module.exports = router;
