import { Either } from '../../shared/domain/Either';
import { ValueObject } from '../../shared/domain/ValueObject';
import { InvalidPasswordError } from './errors/InvalidPassordError';

export class Password extends ValueObject {
  private password: string;
  constructor(password?: string) {
    super();
    this.password = password;
  }

  static hashPassword(hashPassword: string): Password {
   return new Password(hashPassword)
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

  private static createWithValidation(password: string): Password {
    const instance = new Password(password);
    instance.validate();
    return instance;
  }

  static create(password: string): Either<Password, InvalidPasswordError> {
    return Either.safe(() => Password.createWithValidation(password));
  }
}
