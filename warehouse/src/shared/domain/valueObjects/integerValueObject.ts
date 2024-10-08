import { IntegerInvalidException } from '@shared/domain/exceptions/integerInvalidException';

export class IntegerValueObject {
  readonly value: number;

  protected constructor(value: number) {
    this.guardIfInteger(value);
    this.value = value;
  }

  public static build(value: number): IntegerValueObject {
    return new IntegerValueObject(value);
  }

  public static fromString(value: string): IntegerValueObject {
    const valueParsed = parseInt(value);
    return new IntegerValueObject(valueParsed);
  }

  public static zero(): IntegerValueObject {
    return this.build(0);
  }

  public equals(other: IntegerValueObject): boolean {
    return other.value === this.value;
  }

  private guardIfInteger(value: number): void {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new IntegerInvalidException(value);
    }
  }
}
