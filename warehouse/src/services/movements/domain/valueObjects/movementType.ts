import { EnumValueObject } from '@shared/domain/valueObjects/enumValueObject';

enum MovementTypeEnum {
  ingredientEntry = 'ingredientEntry',
  ingredientOutput = 'ingredientOutput',
}

const MOVEMENT_TYPE_ENUM_VALUES = Object.values(MovementTypeEnum);

export class MovementType extends EnumValueObject<MovementTypeEnum> {
  public static build(value: MovementTypeEnum): MovementType {
    return new MovementType(value, MOVEMENT_TYPE_ENUM_VALUES);
  }

  public static fromString(value: string): MovementType {
    return this.build(value as MovementTypeEnum);
  }

  public static entry(): MovementType {
    return this.build(MovementTypeEnum.ingredientEntry);
  }

  public static output(): MovementType {
    return this.build(MovementTypeEnum.ingredientOutput);
  }
}
