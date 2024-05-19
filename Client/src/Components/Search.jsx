import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

Search.defaultProps = {
  searchRoute: "/search/",
  defaultRoute: "/",
  placeholder: "Search One Stop!",
};

export default function Search({
  searchRoute,
  defaultRoute,
  margin = "mt-4",
  placeholder,
}) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);

  const search = async () => {
    term ? navigate(searchRoute + term) : navigate(defaultRoute);
  };
  return (
    <div className="flex justify-center">
      <div className={`flex w-4/5 items-center justify-center ${margin}`}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setTerm(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && search()}
          value={term}
          className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        <button
          onClick={search}
          className=" rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}
