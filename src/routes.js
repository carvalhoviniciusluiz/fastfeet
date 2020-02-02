import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';

import SessionStore from './app/validators/SessionStore';
import UserStore from './app/validators/UserStore';
import UserUpdate from './app/validators/UserUpdate';
import RecipientStoreOrUpdate from './app/validators/RecipientStoreOrUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserStore, UserController.store);
routes.post('/sessions', SessionStore, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.put(
  '/recipients/:id',
  RecipientStoreOrUpdate,
  RecipientController.update
);
routes.post('/recipients', RecipientStoreOrUpdate, RecipientController.store);

routes.get('/couriers', DeliverymanController.index);
routes.post('/couriers', DeliverymanController.store);
routes.put('/couriers/:id', DeliverymanController.update);
routes.delete('/couriers/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);

export default routes;
