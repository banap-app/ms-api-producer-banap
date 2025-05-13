import { Either } from '../../shared/domain/Either';
import { ValueObject } from '../../shared/domain/ValueObject';
import { InvalidFieldBoundaryError } from './errors/InvalidFieldBoundaryError';

export type Coordinate = {
  lat: number;
  lng: number;
};

export class FieldBoundary extends ValueObject {
  private readonly points: Coordinate[];

  constructor(points?: Coordinate[]) {
    super();
    this.points = points;
    this.validate();
  }

  static create(points: Coordinate[]): Either<FieldBoundary, Error> {
    return Either.safe(() => new FieldBoundary(points));
  }

  private validate() {
    if (this.points.length < 3 || this.points.length > 6) {
      throw new InvalidFieldBoundaryError();
    }
  }

  // TODO: convert lat and lng coordinates projected coordinates (x, y)

  public calculateFieldArea() {
    // shoelace formula
    return Math.abs(
      this.points.reduce((acc, current, i, arr) => {
        const next = arr[(i + 1) % arr.length];
        return acc + current.lat * next.lng - current.lng * next.lat;
      }, 0) / 2,
    );
  }
}
