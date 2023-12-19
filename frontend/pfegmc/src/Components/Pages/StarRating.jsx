// StarRating.js

import React from 'react';

const StarRating = ({ sold }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= sold) {
      stars.push(<span key={i} className="star" style={{ color: 'gold', fontSize: '1.2em' }}>&#9733;</span>);
    } else if (i - 0.5 <= sold && sold < i) {
      stars.push(<span key={i} className="star" style={{ color: 'gold', fontSize: '1.2em' }}>&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star" style={{ color: 'gray', fontSize: '1.2em' }}>&#9734;</span>);
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
