export class NotFoundError extends Error {
  constructor(entity: string, id?: string) {
    super(`${entity} not found${id ? ` with id ${id}` : ''}`);
    this.name = 'NotFoundError';
  }
}
