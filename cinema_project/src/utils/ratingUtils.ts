export const getRatingClass = (rating: number | string | undefined): string => {
  if (!rating) return 'rating-green';
  
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  
  if (isNaN(numRating)) return 'rating-green';
  
  if (numRating >= 8.6) return 'rating-gold';
  if (numRating >= 7.0) return 'rating-green';
  if (numRating >= 5.0) return 'rating-gray';
  return 'rating-red';
};
