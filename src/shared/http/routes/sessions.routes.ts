import { Router } from 'express';

import { CreateSessionController } from '@modules/sessions/useCases/createSession/CreateSessionController';

const sessionsRouter = Router();

const createSessionController = new CreateSessionController();

sessionsRouter.post('/', createSessionController.handle);

export { sessionsRouter };
