const express = require('express');
const router = express.Router();
const medioFormatoController = require('../controllers/medioFormatoController');



router.post('/medio', medioFormatoController.CrearMedio);
router.get('/medios', medioFormatoController.ObtenerTodosMedios);


router.post('/formato',  medioFormatoController.CrearFormato);
router.get('/formatos',  medioFormatoController.ObtenerTodosFormatos);

module.exports = router;