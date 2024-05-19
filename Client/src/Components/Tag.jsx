import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Tags = ({ tags, forFoodPage }) => {
  // Check if 'tags' is an array before attempting to map over it
  if (!Array.isArray(tags)) {
    console.error('Expected "tags" to be an array but received:', tags);
    return null; // or some error component
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          to={`/tag/${tag.name}`}
          className="inline-block transform rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800 transition-colors duration-300 ease-in-out hover:-translate-y-1 hover:bg-blue-200"
        >
          {tag.name}
          {!forFoodPage && <span className="text-gray-500">({tag.count})</span>}
        </Link>
      ))}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  forFoodPage: PropTypes.bool,
};

export default Tags;
