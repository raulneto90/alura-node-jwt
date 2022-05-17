import 'express-async-errors';
import './providers';
import express, { NextFunction, Request, Response } from 'express';

import { AppError } from './errors/AppError';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (
    error: Error,
    _resquest: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    console.log({ error: error.message, stack: error.stack });

    return response.status(500).json({ message: 'Internal Server Error' });
  },
);

export { app };
