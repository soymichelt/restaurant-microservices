import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CheckOrdersController extends BaseController<void, void> {
  constructor(@inject('CheckOrdersUseCase') private useCase: CheckOrdersController) {
    super();
  }

  public async run(): Promise<void> {
    await this.useCase.run();
  }
}
