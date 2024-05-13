import React from 'react';

interface RatingProps {
  totalStars: number;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  onClick: (starIndex: number) => void;
}


const Rating: React.FC<RatingProps> = ({ totalStars, rating, onClick }) => {
  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => onClick(index)}
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
