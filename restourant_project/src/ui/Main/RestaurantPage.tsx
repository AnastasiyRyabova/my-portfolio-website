import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRestaurants, updateRestaurantRating, Restaurant } from '../../api/api';
import CardItem from './CardItem';
import Search from './Search';

export default function RestaurantPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const queryClient = useQueryClient();

  const { data: restaurants, isLoading, error } = useQuery<Restaurant[], Error>({
  queryKey: ['restaurants'],
  queryFn: fetchRestaurants,
});


  const mutation = useMutation({
  mutationFn: ({ id, rating }: { id: number; rating: number }) =>
    updateRestaurantRating(id, rating),

  onSuccess: (updatedRestaurant) => {
    queryClient.setQueryData<Restaurant[]>(['restaurants'], (old) =>
      old ? old.map(r => (r.id === updatedRestaurant.id ? updatedRestaurant : r)) : []
    );
  },

  onError: (error) => {
    alert('Ошибка: ' + (error as Error).message);
  },
});

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleRatingChange = (id: number, newRating: number) => {
    mutation.mutate({ id, rating: newRating });
  };

  const filteredRestaurants = restaurants?.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  return (
    <div>
      <Search onSearch={handleSearch} />
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
      {!isLoading && !error && (
        <ul style={{ padding: 0, display: 'flex', flexDirection: 'row', gap: 20 }}>
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <CardItem
                key={restaurant.id}
                id={restaurant.id}
                image={restaurant.image}
                name={restaurant.name}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                onRatingChange={handleRatingChange}
              />
            ))
          ) : (
            <li>No restaurants found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
