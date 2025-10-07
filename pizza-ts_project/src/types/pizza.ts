import { IIngredient } from "./ingredient";

export type TDough = 'толстое' | 'тонкое';
export type TSize = 10 | 15 | 30;

export interface IPizza {
  id: number;
  name: string;
  dough: TDough;
  size: TSize;
  ingredients: IIngredient[];
}
