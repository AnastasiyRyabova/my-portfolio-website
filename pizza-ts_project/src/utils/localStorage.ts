import { PIZZAS_LS_KEY } from "../constants";
import { IPizza } from '../types/pizza';

export const savePizzas = (list: IPizza[]): void => {
  const serializedList = JSON.stringify(list);

  localStorage.setItem(PIZZAS_LS_KEY, serializedList);
};

export const getPizzas = (): IPizza[] => {
  const serializedList = localStorage.getItem(PIZZAS_LS_KEY);

  if (serializedList) {
    return JSON.parse(serializedList) as IPizza[];
  }

  return [];
};