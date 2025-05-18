export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message ?? 'UUID must be valid');
    this.name = 'InvalidUuidError';
  }
}
