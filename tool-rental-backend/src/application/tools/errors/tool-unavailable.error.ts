export class ToolUnavailableError extends Error {
  constructor(toolId: string) {
    super(`Tool ${toolId} is currently unavailable for rent`);
    this.name = 'ToolUnavailableError';

    // This fixes the prototype chain for instanceof checks
    Object.setPrototypeOf(this, ToolUnavailableError.prototype);
  }
}
