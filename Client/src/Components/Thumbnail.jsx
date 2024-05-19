import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
import Rating from "./Rating";
import PropTypes from "prop-types";
import FavoriteIcon from "./FavoriteIcon";

const Thumbnail = ({ foods = [] }) => {
  if (!Array.isArray(foods)) {
    console.error('Expected "foods" to be an array but received:', foods);
    return null;
  }

  return (
    <>
      <ol className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {foods.map((food) => (
          <li
            key={food._id}
            className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url(${food.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link
              to={`/food/${food._id}`}
              className="block bg-white bg-opacity-50 p-5"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{food.name}</h3>
                <FavoriteIcon favorite={food.favorite} />
              </div>
              <p className="text-slate-600">{`${food.origins} `}</p>
              <p className="flex items-center text-slate-600">
                🕛 {food.cookTime}
              </p>
              <Price price={food.price} />
              <div className="flex-col">
                <Rating stars={food.stars} />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
};

Thumbnail.propTypes = {
  foods: PropTypes.array.isRequired,
};

export default Thumbnail;
