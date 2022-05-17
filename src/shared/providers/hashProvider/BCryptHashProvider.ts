import { compareSync, hashSync } from 'bcryptjs';

import { IHashProvider } from './IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  generateHash(payload: string): string {
    return hashSync(payload, 8);
  }

  compareHash(payload: string, hashed: string): boolean {
    return compareSync(payload, hashed);
  }
}
