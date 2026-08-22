export class InvalidToolDataError extends Error {
  constructor(message: string) {
    super(`Invalid tool data: ${message}`);
    this.name = 'InvalidToolDataError';
  }
}
