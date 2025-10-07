

// const API_URL = 'http://localhost:3000';

// export const getRestaurants = async (): Promise<ApiResponse> => {
//   const response = await fetch(`${API_URL}/restaurants`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch restaurants');
//   }
//   return response.json();
// };

// export const updateRestaurantRating = async (id: string, rating: number): Promise<ApiRestaurant> => {
//   const response = await fetch(`${API_URL}/restaurants/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ raiting: rating }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update rating');
//   }

//   return response.json();
// };
