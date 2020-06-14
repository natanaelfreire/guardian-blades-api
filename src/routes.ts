import express from 'express';

import UsersController from './controllers/UsersController';

const routes = express.Router();

const usersController = new UsersController();

routes.post('/users', usersController.create);
routes.post('/login', usersController.login);
routes.get('/users', usersController.find);

export default routes;