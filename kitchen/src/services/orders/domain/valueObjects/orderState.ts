import { EnumValueObject } from '@shared/domain/valueObjects/enumValueObject';

enum OrderStateEnum {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done',
  delivered = 'delivered',
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

  public static delivered(): OrderState {
    return this.build(OrderStateEnum.delivered);
  }

  public isTodo(): boolean {
    return this.value === OrderStateEnum.done;
  }

  public isInProgress(): boolean {
    return this.value === OrderStateEnum.inProgress;
  }

  public isDone(): boolean {
    return this.value === OrderStateEnum.done;
  }

  public isFinalState(): boolean {
    const currentStep = ORDER_STATE_ENUM_VALUES.findIndex((state) => state === this.value);
    return currentStep === ORDER_STATE_ENUM_VALUES.length - 1;
  }

  public nextStep(): OrderState {
    const currentStep = ORDER_STATE_ENUM_VALUES.findIndex((state) => state === this.value);
    if (currentStep === ORDER_STATE_ENUM_VALUES.length - 1) {
      return;
    }

    return OrderState.build(ORDER_STATE_ENUM_VALUES[currentStep + 1] as OrderStateEnum);
  }
}
