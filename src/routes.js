import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import SessionStore from './app/validators/SessionStore';
import UserStore from './app/validators/UserStore';
import UserUpdate from './app/validators/UserUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserStore, UserController.store);
routes.post('/sessions', SessionStore, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
