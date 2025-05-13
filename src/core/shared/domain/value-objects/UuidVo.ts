import { InvalidUuidError } from '../errors/InvalidUuidError';
import { ValueObject } from '../ValueObject';
import { v4 as uuidV4, validate as validateUuid } from 'uuid';

export class Uuid extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id ? id : uuidV4();
    this.validate();
  }

  private validate(): void {
    const isValid = validateUuid(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  toString(): string {
    return this.id;
  }
}
