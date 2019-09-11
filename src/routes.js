import { Router } from 'express';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Login
routes.post('/sessions', SessionController.store);
// User
// Create user
routes.post('/users', UserController.store);
// List users
routes.get('/users', UserController.index);

// Session middleware
routes.use(authMiddleware);

// Update user
routes.put('/users', UserController.update);
// Delete user
routes.delete('/users/:id', UserController.delete);

export default routes;
