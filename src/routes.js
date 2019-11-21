import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpController from './app/controllers/HelpController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.post('/students/:id/checkin', CheckinController.store);
routes.get('/students/:id/checkin', CheckinController.index);
routes.post('/students/:id/help-orders', HelpController.store);
routes.get('/students/:id/help-orders', HelpController.index);
routes.post('/help-orders/:id/answer', HelpController.update);

routes.use(authMiddlewares);
routes.post('/students', StudentController.store);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registration/:id', RegistrationController.store);
routes.get('/registration/:id', RegistrationController.index);
routes.put('/registration/:id', RegistrationController.update);

export default routes;
