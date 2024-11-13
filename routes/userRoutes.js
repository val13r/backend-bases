const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const protect = require('../mID_Usuariodleware/authMID_Usuariodleware'); 

router.get('/', userController.ObtenerTodosUsuario);
router.post('/', userController.CrearUsuario);
router.post('/login', userController.LoginUsuario);
router.get('/:ID_Usuario', userController.ObtenerUsuarioPorId);
router.put('/:ID_Usuario', userController.ActualizarUsuario);
router.delete('/:ID_Usuario', userController.EliminarUsuario);

module.exports = router;
