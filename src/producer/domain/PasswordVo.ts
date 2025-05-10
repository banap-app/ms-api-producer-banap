import { Either } from "../../shared/domain/Either";
import { ValueObject } from "../../shared/domain/ValueObject";
import { InvalidPasswordError } from "./errors/InvalidPassordError";

export class Password extends ValueObject {
    private regex: RegExp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
    private password: string
    constructor(password: string) {
        super()
        this.password = password
    }

    private validate() {
        const isValid = this.regex.test(this.password)
        if (!isValid) {
            throw new InvalidPasswordError()
        }
    }

    static create(password: string): Either<Password, InvalidPasswordError> {
        return Either.safe(()=> new Password(password))
    }
}