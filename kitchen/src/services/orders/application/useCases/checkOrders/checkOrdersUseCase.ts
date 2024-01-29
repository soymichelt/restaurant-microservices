import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { DateRange } from '@shared/domain/valueObjects/dateRangeValueObject';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CheckOrdersUseCase extends UseCase<void, void> {
  constructor(
    @inject('OrderRepository') private repository: OrderRepository,
    @inject('EventBusQueue') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(): Promise<void> {
    const ordersToday = await this.repository.all(null, DateRange.today());
    if (!ordersToday?.length) return;

    for (const order of ordersToday) {
      if (!order.isTodo()) return;

      order.requestOrderAgain();
      await this.eventBus.publish(order.pullEvents());
    }
  }
}
