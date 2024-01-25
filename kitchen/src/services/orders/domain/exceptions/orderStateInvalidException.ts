import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class OrderStateInvalidException extends DomainException {
  constructor(orderId: OrderId, currentStage: OrderState, newState?: OrderState) {
    super({
      name: StringValueObject.build('OrderStateInvalidException'),
      message: StringValueObject.build(`Cannot change status from "${currentStage.value}" to "${newState.value}"`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['OrderStateInvalidException']),
      errorType: ErrorType.error(),
      metadata: {
        orderId: orderId.value,
        currentState: currentStage.value,
        newState: newState?.value,
      },
    });
  }
}
