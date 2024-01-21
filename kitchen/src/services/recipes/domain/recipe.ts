import { RecipeDescription } from '@services/recipes/domain/valueObjects/recipeDescription';
import { RecipeName } from '@services/recipes/domain/valueObjects/recipeName';
import { RecipePreparationMethod } from '@services/recipes/domain/valueObjects/recipePreparationMethod';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';

export type RecipeProps = {
  recipeId: RecipeId;
  name: RecipeName;
  description?: RecipeDescription;
  preparationMethod?: RecipePreparationMethod;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type RecipePrimitives = {
  recipeId: string;
  name: string;
  description?: string;
  preparationMethod?: string;

  createdAt: string;
  updatedAt: string;
};

export class Recipe extends AggregateRoot {
  private _recipeId: RecipeId;
  private _name: RecipeName;
  private _description: RecipeDescription;
  private _preparationMethod: RecipePreparationMethod;

  private constructor(props: RecipeProps) {
    super();

    this._recipeId = props.recipeId;
    this._name = props.name;
    this._description = props.description;
    this._preparationMethod = props.preparationMethod;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get recipeId(): RecipeId {
    return this._recipeId;
  }

  public static build(props: RecipeProps): Recipe {
    return new Recipe(props);
  }

  public static fromPrimitives(props: RecipePrimitives): Recipe {
    return new Recipe({
      recipeId: RecipeId.build(props.recipeId),
      name: RecipeName.build(props.name),
      description: props.description ? RecipeDescription.build(props.description) : undefined,
      preparationMethod: props.preparationMethod ? RecipePreparationMethod.build(props.preparationMethod) : undefined,

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): RecipePrimitives {
    return {
      recipeId: this._recipeId.value,
      name: this._name.value,
      description: this._description?.value,
      preparationMethod: this._preparationMethod?.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
