export class DuplicateToolError extends Error {
  constructor(title: string) {
    super(`A tool with the name "${title}" already exists for this owner`);
    this.name = 'DuplicateToolError';

    // This fixes the prototype chain for instanceof checks
    Object.setPrototypeOf(this, DuplicateToolError.prototype);
  }
}
