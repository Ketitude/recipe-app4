const db = require('../../db/database');

// Dodavanje novog recepta
const addRecipe = (recipe, callback) => {
  const { title, ingredients, instructions, image } = recipe;
  const sql = 'INSERT INTO recipes (title, ingredients, instructions, image) VALUES (?, ?, ?, ?)';
  db.run(sql, [title, ingredients, instructions, image], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

// Preuzimanje svih recepata
const getAllRecipes = (callback) => {
  const sql = 'SELECT * FROM recipes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

// Preuzimanje recepta po ID-u
const getRecipeById = (id, callback) => {
  const sql = 'SELECT * FROM recipes WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

// Ažuriranje recepta
const updateRecipe = (id, recipe, callback) => {
  const { title, ingredients, instructions, image } = recipe;
  const sql = 'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?';
  db.run(sql, [title, ingredients, instructions, image, id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { changes: this.changes });
  });
};

// Brisanje recepta
const deleteRecipe = (id, callback) => {
  const sql = 'DELETE FROM recipes WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { changes: this.changes });
  });
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
