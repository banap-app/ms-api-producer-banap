export class NotFoundError extends Error {
  constructor(message?: string, entity?: string) {
    super(message ?? `Not Found Entity ${entity ? `: ${entity}` : ''}`);
    this.name = 'NotFoundError';
  }
}
