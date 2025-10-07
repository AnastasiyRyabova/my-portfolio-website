import { IIngredient } from "./types/ingredient";
import { TDough, TSize } from "./types/pizza";

export const INGREDIENTS: IIngredient[] = [
  {
    id: 1,
    name: 'помидор',
    kcal: 100,
  },
  {
    id: 2,
    name: 'бекон',
    kcal: 350,
  },
  { 
    id: 3,
    name: 'сыр',
    kcal: 500,
  },
  {
    id: 4,
    name: 'ананас',
    kcal: 400,
  }
];

export const SIZES: Array<TSize> = [10, 15, 30];

export const DOUGHS: Array<TDough> = ['толстое', 'тонкое'];

export const PIZZAS_LS_KEY = 'pizzas_list';
