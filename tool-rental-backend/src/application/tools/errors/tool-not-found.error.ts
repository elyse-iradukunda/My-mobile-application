import { NotFoundError } from '@common/not-found.error';

export class ToolNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('Tool', id);
    this.name = 'ToolNotFoundError';
  }
}
