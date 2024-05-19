import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const FavoriteIcon = ({ favorite }) => {
  return (
    <div>
      <span>
        {favorite ? (
          <FontAwesomeIcon icon={solidHeart} className="text-red-600" />
        ) : (
          <FontAwesomeIcon icon={regularHeart} />
        )}
      </span>
    </div>
  );
};

export default FavoriteIcon;
