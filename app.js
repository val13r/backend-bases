const express = require('express');
const userRoutes = require('./routes/userRoutes');
const recursoRoutes = require('./routes/recursoRoutes');
const categoriaAreaRoutes = require('./routes/categoriaAreaRoutes');
const medioFormatoRoutes = require('./routes/medioFormatoRoutes');
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json());


app.use('/api/users', userRoutes);


app.use('/api/recursos', recursoRoutes);


app.use('/api/categorias', categoriaAreaRoutes);


app.use('/api/formatos', medioFormatoRoutes);

module.exports = app;
