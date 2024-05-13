import React, { useState } from 'react';

// Uppdatera RatingProps-gränssnittet för att inkludera rating-egenskapen
interface RatingProps {
    totalStars: number;
    rating: number; // Lägg till rating-egenskapen
    setRating: React.Dispatch<React.SetStateAction<number>>; // Typ för setRating
  }
  

const Rating: React.FC<RatingProps> = ({ totalStars }) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer' }}
        >
          {index < rating ? '\u2605' : '\u2606'}
        </span>
      ))}
      <p>Rating: {rating} out of {totalStars}</p>
    </div>
  );
};

export default Rating;
