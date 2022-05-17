import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import jwtConfig from '@config/jwt';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, jwtConfig.secret) as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(id);

    if (!user) throw new AppError('Invalid JWT token', 401);

    request.user = {
      id,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
