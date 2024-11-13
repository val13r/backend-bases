const express = require('express');
const router = express.Router();
const categoriaAreaController = require('../controllers/categoriaAreaController');



router.post('/area', categoriaAreaController.CrearArea);
router.get('/areas', categoriaAreaController.ObtenerTodasAreas);


router.post('/categoria',  categoriaAreaController.CrearCategoria);
router.get('/categorias', categoriaAreaController.ObtenerTodasCategorias);
router.get('/categorias/area/:ID_Area', categoriaAreaController.ObtenerCategoriasPorIdArea);

module.exports = router;