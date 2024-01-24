import { RecipeIngredientQuantity } from '@services/recipes/domain/valueObjects/recipeIngredientQuantity';
import { IngredientId } from '@shared/domain/valueObjects/ingredientId';

export type RecipeIngredientProps = {
  ingredientId: IngredientId;
  quantity: RecipeIngredientQuantity;
};

export type RecipeIngredientPrimitives = {
  ingredientId: string;
  quantity: number;
};

export class RecipeIngredient {
  private _ingredientId: IngredientId;
  private _quantity: RecipeIngredientQuantity;

  private constructor(props: RecipeIngredientProps) {
    this._ingredientId = props.ingredientId;
    this._quantity = props.quantity;
  }

  public static build(props: RecipeIngredientProps): RecipeIngredient {
    return new RecipeIngredient(props);
  }

  public static fromPrimitives(props: RecipeIngredientPrimitives): RecipeIngredient {
    return this.build({
      ingredientId: IngredientId.build(props.ingredientId),
      quantity: RecipeIngredientQuantity.build(props.quantity),
    });
  }

  public toPrimitives(): RecipeIngredientPrimitives {
    return {
      ingredientId: this._ingredientId.value,
      quantity: this._quantity.value,
    };
  }
}
