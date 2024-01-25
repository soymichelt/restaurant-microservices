import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class OrderNotFoundException extends DomainException {
  constructor(orderId: OrderId) {
    super({
      name: StringValueObject.build('OrderNotFoundException'),
      message: StringValueObject.build(`Order not found`),
      status: IntegerValueObject.build(404),
      code: StringValueObject.build(ERROR_CODES['OrderNotFoundException']),
      errorType: ErrorType.error(),
      metadata: { orderId: orderId.value },
    });
  }
}
