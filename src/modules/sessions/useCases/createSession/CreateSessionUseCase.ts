import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import jwtConfig from '@config/jwt';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IHashProvider } from '@shared/providers/hashProvider/IHashProvider';

import { CreateSessionDTO } from './dtos/CreateSessionDTO';

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: CreateSessionDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordMatched = this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination.', 401);

    const token = sign({}, jwtConfig.secret, {
      subject: user.id,
      expiresIn: jwtConfig.expiresIn,
    });

    return { token };
  }
}
