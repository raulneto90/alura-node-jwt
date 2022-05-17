import { AppError } from 'src/errors/AppError';
import { IHashProvider } from 'src/providers/hashProvider/IHashProvider';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { CreateUserDTO } from './dtos/CreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) throw new AppError('User already exists');

    const passwordHashed = this.hashProvider.generateHash(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: passwordHashed,
    });

    return user;
  }
}
