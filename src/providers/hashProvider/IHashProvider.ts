export interface IHashProvider {
  generateHash(payload: string): string;
  compareHash(payload: string, hashed: string): boolean;
}
