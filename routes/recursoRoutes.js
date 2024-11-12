const express = require('express');
const router = express.Router();
const recursoController = require('../controllers/recursoController');



router.post('/', recursoController.CrearRecurso);
router.get('/', recursoController.ObtenerTodosRecursos);
router.get('/:id', recursoController.ObtenerRecursoPorId);
router.delete('/:id', recursoController.EliminarRecurso);

module.exports = router;