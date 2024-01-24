import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';

export class MovementNumber extends IntegerValueObject {
  public static default(): MovementNumber {
    return new MovementNumber(-1);
  }
}
