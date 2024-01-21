import { EnumValueObject } from '@shared/domain/valueObjects/enumValueObject';

enum OrderStateEnum {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done',
}

const ORDER_STATE_ENUM_VALUES = Object.values(OrderStateEnum);

export class OrderState extends EnumValueObject<OrderStateEnum> {
  public static build(value: OrderStateEnum): OrderState {
    return new OrderState(value, ORDER_STATE_ENUM_VALUES);
  }

  public static fromString(value: string): OrderState {
    return this.build(value as OrderStateEnum);
  }

  public static todo(): OrderState {
    return this.build(OrderStateEnum.todo);
  }

  public static inProgress(): OrderState {
    return this.build(OrderStateEnum.inProgress);
  }

  public static done(): OrderState {
    return this.build(OrderStateEnum.done);
  }
}
