import { IPizza } from "../types/pizza";
import { getCurrentTime } from "./getCurrentTime";

export const prepareAnalytics = (pizza: IPizza) => ({
  page: 'Main',
  type: 'desktop',
  time: getCurrentTime(),
  pizza,
});
