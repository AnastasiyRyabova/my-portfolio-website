import stars from '../../assets/star.svg';

interface CardItemProps {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  rating: number;
  onRatingChange: (id: number, newRating: number) => void;
}

export default function CardItem({ id, image, name, cuisine, rating, onRatingChange }: CardItemProps) {
  
  const handleStarClick = (newRating: number) => {
    onRatingChange(id, newRating); 
  };

  return (
    <li key={id} style={{ listStyle: 'none', marginBottom: 20 }}>
      <img src={image} alt={name} style={{ width: 400, borderRadius: 20, height: 200 }} />
      <h2>{name}</h2>
      <p>{cuisine}, {rating} stars</p>
      {Array.from({ length: 5 }, (_, index) => (
        <img 
          key={index} 
          src={stars} 
          alt="star" 
          style={{ width: 30, cursor: 'pointer', opacity: index < Math.round(rating) ? 1 : 0.5 }} 
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </li>
  );
}
