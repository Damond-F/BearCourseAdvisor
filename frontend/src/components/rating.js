import React from 'react';
import { FaStar } from 'react-icons/fa'; // Make sure to install react-icons using npm or yarn

const StarRating = ({ rating }) => {
  // Assuming rating is a float between 1.0 and 5.0
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            size={20}
            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          />
        );
      })}
    </div>
  );
};



export default StarRating;
