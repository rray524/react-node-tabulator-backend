const express = require('express');

const app = express();

const officeRoutes = require('./officeRoutes')


app.use('/office', officeRoutes)


module.exports = app;