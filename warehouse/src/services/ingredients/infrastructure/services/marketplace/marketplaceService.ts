import { MarketplaceService } from '@services/ingredients/domain/services/marketplaceService';
import { IngredientName } from '@services/ingredients/domain/valueObjects/ingredientName';
import { Logger } from '@shared/domain/loggers/logger';
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MarketplaceServiceImplemented implements MarketplaceService {
  private static API_URL: string = `https://recruitment.alegra.com/api/farmers-market/buy`;

  constructor(@inject('Logger') private logger: Logger) {}

  public async buy(ingredientName: IngredientName): Promise<number> {
    try {
      const { data } = await axios.get<{ quantitySold: number }>(
        `${MarketplaceServiceImplemented.API_URL}?ingredient=${ingredientName.value}`,
        {
          headers: { Accept: 'application/json' },
        },
      );

      return data.quantitySold;
    } catch (error) {
      this.logger.error({
        message: error?.message,
        stack: error?.stack,
      });
      throw new Error();
    }
  }
}
