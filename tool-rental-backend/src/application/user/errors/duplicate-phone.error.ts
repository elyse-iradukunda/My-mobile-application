export class DuplicatePhoneError extends Error {
  constructor(phone: string) {
    super(`User with phone ${phone} already exists`);
    this.name = 'DuplicatePhoneError';
  }
}
