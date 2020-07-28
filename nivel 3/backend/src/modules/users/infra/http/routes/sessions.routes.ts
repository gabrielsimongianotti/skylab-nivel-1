import { Router } from 'express';
import UsersController from '../../controller/SessionsController';

const sessionsRouter = Router();
const usersController = new UsersController();
// Rota POST
sessionsRouter.post('/', usersController.create);

export default sessionsRouter;