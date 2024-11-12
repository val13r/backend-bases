const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.ObtenerTodosUsuario = (req, res) => {
  const query = 'SELECT * FROM Usuario';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.CrearUsuario = (req, res) => {
  const { Nombre, Correo_Electronico, Contraseña, Rol } = req.body;
  const Fecha_Registro = new Date();

  if (!Nombre || !Correo_Electronico || !Contraseña || !Rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  bcrypt.hash(Contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error al hashear la contraseña' });
    }

    const query = 'INSERT INTO Usuario (Nombre, Correo_Electronico, Contraseña, Rol, Fecha_Registro) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [Nombre, Correo_Electronico, hashedPassword, Rol, Fecha_Registro], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ ID_Usuario: results.insertId, Nombre, Correo_Electronico, Rol, Fecha_Registro });
      }
    });
  });
};

exports.ObtenerUsuarioPorId = (req, res) => {
  const { ID_Usuario } = req.params;
  const query = 'SELECT * FROM Usuario WHERE ID_Usuario = ?';
  db.query(query, [ID_Usuario], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

exports.ActualizarUsuario = (req, res) => {
  const { ID_Usuario } = req.params;
  const { Nombre, Correo_Electronico, Contraseña, Rol } = req.body;

  console.log(`Intentando actualizar usuario con ID: ${ID_Usuario}`);
  console.log('Datos recibID_Usuarioos:', { Nombre, Correo_Electronico, Contraseña, Rol });

  if (!Nombre || !Correo_Electronico || !Contraseña || !Rol) {
    console.warn('Todos los campos son obligatorios para actualizar un usuario');
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  bcrypt.hash(Contraseña, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al hashear la contraseña:', err.message);
      return res.status(500).json({ error: 'Error al hashear la contraseña' });
    }

    const query = 'UPDATE Usuario SET Nombre = ?, Correo_Electronico = ?, Contraseña = ?, Rol = ? WHERE ID_Usuario = ?';
    db.query(query, [Nombre, Correo_Electronico, hashedPassword, Rol, ID_Usuario], (err, results) => {
      if (err) {
        console.error('Error al actualizar el usuario en la base de datos:', err.message);
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        console.warn(`Usuario con ID ${ID_Usuario} no encontrado para actualizar.`);
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        console.log(`Usuario con ID ${ID_Usuario} actualizado exitosamente.`);
        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
      }
    });
  });
};


exports.EliminarUsuario = (req, res) => {
  const { ID_Usuario } = req.params;
  const query = 'DELETE FROM Usuario WHERE ID_Usuario = ?';
  db.query(query, [ID_Usuario], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    }
  });
};