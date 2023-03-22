const routes = require('express').Router();
const user = require('../controllers/user');
const project = require('../controllers/project');
routes.use('/user', user);
routes.use('/project', project);

module.exports = routes;