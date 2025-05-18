export class InvalidFieldBoundaryError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid Field Boundary');
    this.name = 'InvalidFieldBoundaryError';
  }
}
