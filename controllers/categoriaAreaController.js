const db = require('../config/db');


exports.CrearArea = (req, res) => {
  const { Nombre_Area } = req.body;

  if (!Nombre_Area) {
    return res.status(400).json({ error: 'El nombre del área es obligatorio' });
  }

  const query = 'INSERT INTO Area (Nombre_Area) VALUES (?)';
  db.query(query, [Nombre_Area], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, Nombre_Area });
    }
  });
};


exports.ObtenerCategoriasPorIdArea = (req, res) => {
  const { ID_Area } = req.params;

  const query = 'SELECT * FROM Categoria WHERE ID_Area = ?';
  db.query(query, [ID_Area], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron categorías para el área especificada' });
    } else {
      res.status(200).json(results);
    }
  });
};


exports.ObtenerTodasAreas = (req, res) => {
  const query = 'SELECT * FROM Area';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};


exports.CrearCategoria = (req, res) => {
  const { ID_Area, Nombre_Categoria } = req.body;

  if (!ID_Area || !Nombre_Categoria) {
    return res.status(400).json({ error: 'ID del área y nombre de la categoría son obligatorios' });
  }

  const query = 'INSERT INTO Categoria (ID_Area, Nombre_Categoria) VALUES (?, ?)';
  db.query(query, [ID_Area, Nombre_Categoria], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, Nombre_Categoria });
    }
  });
};


exports.ObtenerTodasCategorias = (req, res) => {
  const query = 'SELECT * FROM Categoria';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};