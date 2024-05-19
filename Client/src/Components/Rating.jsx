import React from 'react';

// Star component with React.memo for performance optimization
const Star = React.memo(({ number, stars, size }) => {
  const starType = stars >= number ? 'full' : stars >= number - 0.5 ? 'half' : 'empty';
  const imagePath = `/star-${starType}.svg`;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    marginRight: `${size / 6}px`,
  };

  return <img src={imagePath} style={style} alt={`${starType} star`} />;
});

// Rating component with destructured props and default parameter values
export default function Rating({ stars, size = 18 }) {
  return (
    <div className="flex"> {/* Ensure that 'rating' class is defined in your CSS */}
      {[1, 2, 3, 4, 5].map(number => (
        <Star key={number} number={number} stars={stars} size={size} />
      ))}
    </div>
  );
}
