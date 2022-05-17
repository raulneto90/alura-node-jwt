import { container } from 'tsyringe';

import { BCryptHashProvider } from './hashProvider/BCryptHashProvider';
import { IHashProvider } from './hashProvider/IHashProvider';
import './repository';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
