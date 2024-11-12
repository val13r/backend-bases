const db = require('../config/db');


exports.CrearMedio = (req, res) => {
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ error: 'El nombre del medio es obligatorio' });
  }

  const query = 'INSERT INTO Medio (Nombre) VALUES (?)';
  db.query(query, [Nombre], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, Nombre });
    }
  });
};


exports.ObtenerTodosMedios = (req, res) => {
  const query = 'SELECT * FROM Medio';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};


exports.CrearFormato = (req, res) => {
  const { ID_Medio, Nombre } = req.body;

  if (!ID_Medio || !Nombre) {
    return res.status(400).json({ error: 'ID del medio y nombre del formato son obligatorios' });
  }

  const query = 'INSERT INTO Formato (ID_Medio, Nombre) VALUES (?, ?)';
  db.query(query, [ID_Medio, Nombre], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, Nombre });
    }
  });
};


exports.ObtenerTodosFormatos = (req, res) => {
  const query = 'SELECT * FROM Formato';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};