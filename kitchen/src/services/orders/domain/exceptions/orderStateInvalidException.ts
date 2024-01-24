import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { OrderState } from '@services/orders/domain/valueObjects/orderState';
import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class OrderStateInvalidException extends DomainException {
  constructor(orderId: OrderId, state: OrderState) {
    super({
      name: StringValueObject.build('OrderStateInvalidException'),
      message: StringValueObject.build(`Only orders that are in preparation can be finalized`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['OrderStateInvalidException']),
      errorType: ErrorType.error(),
      metadata: {
        orderId: orderId.value,
        state: state.value,
      },
    });
  }
}
