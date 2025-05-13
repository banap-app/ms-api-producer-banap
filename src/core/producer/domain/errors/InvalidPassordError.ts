export class InvalidPasswordError extends Error {
  constructor(message?: string) {
    super(message ?? "Invalid Password");
    this.name = "InvalidPasswordError";
  }
}
