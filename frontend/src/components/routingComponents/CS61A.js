import React from 'react';
import StarRating from '../StarRating'; // Path to your StarRating component

const CS61A = () => {
  const courseCode = 'CS61A'
  const professor = {
    name: "John Denero",
    rating: 4.2 // Example rating
  };

  return (
    <div>
      <h2>CS61A - Structure and Interpretation of Computer Programs </h2>
      <div>
        <h3>{professor.name}</h3>
        <StarRating rating={professor.rating} />
      </div>
      {/* Other content */}
    </div>
  );
};



export default CS61A;