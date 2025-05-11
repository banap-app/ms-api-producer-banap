import { Either } from "../../shared/domain/Either";
import { ValueObject } from "../../shared/domain/ValueObject";
import { InvalidPasswordError } from "./errors/InvalidPassordError";

export class Password extends ValueObject {
  private password: string;
  constructor(password?: string) {
    super();
    this.password = password;
    this.validate();
  }

  private validate() {
    const regex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const isValid = regex.test(this.password);
    if (!isValid) {
      throw new InvalidPasswordError();
    }
  }

  get getValue(): string {
    return this.password;
  }
  static create(password: string): Either<Password, InvalidPasswordError> {
    return Either.safe(() => new Password(password));
  }
}
