
const db = require('../config/db');


exports.CrearRecurso = (req, res) => {
  const { ID_Formato, Titulo, Descripcion, URL_Archivo, ID_Categoria, ID_Usuario } = req.body;
  const Fecha_Subida = new Date();

  if (!ID_Formato || !Titulo || !Descripcion || !URL_Archivo || !ID_Categoria || !ID_Usuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }


  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al iniciar la transacción' });
    }

    const queryRecurso = 'INSERT INTO Recurso_Educativo (ID_Usuario, ID_Formato, Titulo, Descripcion, Fecha_Subida, URL_Archivo) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(queryRecurso, [ID_Usuario, ID_Formato, Titulo, Descripcion, Fecha_Subida, URL_Archivo], (err, results) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }

      const ID_Recurso = results.insertId;
      const queryRelacion = 'INSERT INTO Recurso_Categoria (ID_Categoria, ID_Recurso) VALUES (?, ?)';
      db.query(queryRelacion, [ID_Categoria, ID_Recurso], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Error al confirmar la transacción' });
            });
          }
          res.status(201).json({ id: ID_Recurso, Titulo, Descripcion, URL_Archivo });
        });
      });
    });
  });
};


exports.ObtenerTodosRecursos = (req, res) => {
  const query = 'SELECT * FROM Recurso_Educativo';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};


exports.ObtenerRecursoPorId = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Recurso_Educativo WHERE ID_Recurso = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Recurso no encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};


exports.EliminarRecurso = (req, res) => {
  const { id } = req.params;

  const queryDeleteCategorias = 'DELETE FROM Recurso_Categoria WHERE ID_Recurso = ?';
  db.query(queryDeleteCategorias, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const queryDeleteRecurso = 'DELETE FROM Recurso_Educativo WHERE ID_Recurso = ?';
    db.query(queryDeleteRecurso, [id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Recurso no encontrado' });
      } else {
        res.status(200).json({ mensaje: 'Recurso eliminado exitosamente' });
      }
    });
  });
};


exports.AsignarCategoriaARecurso = (req, res) => {
  const { ID_Categoria, ID_Recurso } = req.body;

  if (!ID_Categoria || !ID_Recurso) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO Recurso_Categoria (ID_Categoria, ID_Recurso) VALUES (?, ?)';
  db.query(query, [ID_Categoria, ID_Recurso], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ID_Categoria, ID_Recurso });
    }
  });
};


exports.ObtenerCategoriasPorRecurso = (req, res) => {
  const { idRecurso } = req.params;

  const query = `
    SELECT rc.ID_Recurso_Categoria, c.ID_Categoria, c.Nombre_Categoria
    FROM Recurso_Categoria rc
    JOIN Categoria c ON rc.ID_Categoria = c.ID_Categoria
    WHERE rc.ID_Recurso = ?`;

  db.query(query, [idRecurso], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Categorías no encontradas para el recurso especificado' });
    } else {
      res.status(200).json(results);
    }
  });
};


exports.EliminarCategoriaDeRecurso = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Recurso_Categoria WHERE ID_Recurso_Categoria = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Relación no encontrada' });
    } else {
      res.status(200).json({ mensaje: 'Relación eliminada exitosamente' });
    }
  });
};
