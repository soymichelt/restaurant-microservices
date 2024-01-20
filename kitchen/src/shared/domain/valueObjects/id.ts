import { IdInvalidException } from '@shared/domain/exceptions/idInvalidException';
import { v4, validate } from 'uuid';

export class Id {
  readonly value: string;

  protected constructor(value: string) {
    if (!validate(value)) {
      throw new IdInvalidException(value);
    }

    this.value = value;
  }

  public static build(value: string): Id {
    return new Id(value);
  }

  public static newId(): Id {
    const generatedId = v4();
    return new Id(generatedId);
  }

  public toString(): string {
    return this.value?.toString();
  }
}
