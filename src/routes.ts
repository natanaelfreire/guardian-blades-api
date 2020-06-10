import express from 'express';

import UsersController from './controllers/UsersController';

const routes = express.Router();

const usersController = new UsersController();

routes.post('/users', usersController.create);
routes.get('/users/:id', usersController.show);

export default routes;