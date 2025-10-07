import { z } from 'zod';

export const RestaurantSchema = z.object({
  id: z.number(),
  name: z.string(),
  cuisine: z.string(),
  rating: z.number(),
  image: z.string(),
});


const RawRestaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  raiting: z.number(), 
  url: z.string(),
});

const RawRestaurantsResponseSchema = z.array(RawRestaurantSchema);

export type Restaurant = z.infer<typeof RestaurantSchema>;

const API_URL = 'http://localhost:3000';


function handleFetchError(response: Response, errorMessage: string): void {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
}


function parseCuisine(description: string): string {

  return description.split(',')[0].trim();
}


function transformRawToRestaurant(raw: z.infer<typeof RawRestaurantSchema>): Restaurant {
  return {
    id: Number(raw.id),
    name: raw.name,
    cuisine: parseCuisine(raw.description),
    rating: raw.raiting,
    image: raw.url,
  };
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${API_URL}/restaurants`);
  handleFetchError(response, 'Ошибка при загрузке ресторанов');

  const rawData = await response.json();


  const parsedRaw = RawRestaurantsResponseSchema.parse(rawData);


  const restaurants = parsedRaw.map(transformRawToRestaurant);


  return z.array(RestaurantSchema).parse(restaurants);
}



export async function updateRestaurantRating(id: number, newRating: number): Promise<Restaurant> {
  // Получить текущие данные
  const getRes = await fetch(`${API_URL}/restaurants/${id}`);
  handleFetchError(getRes, 'Ошибка получения ресторана');
  const currentRaw = RawRestaurantSchema.parse(await getRes.json());

  // Обновить рейтинг
  const updatedRaw = { ...currentRaw, raiting: newRating };

  // Отправить обновление
  const updateRes = await fetch(`${API_URL}/restaurants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRaw),
  });
  handleFetchError(updateRes, 'Ошибка при обновлении рейтинга');

  const updatedRawData = await updateRes.json();
  const parsedUpdated = RawRestaurantSchema.parse(updatedRawData);
  return transformRawToRestaurant(parsedUpdated);
}
