import { NotFoundError } from '@common/not-found.error';

export class UserNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('User', id);
    this.name = 'UserNotFoundError';
  }
}
