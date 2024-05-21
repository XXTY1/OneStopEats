import React, { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getById } from "../services/foodService";

// Lazy load components
const Rating = lazy(() => import("../Components/Rating"));
const Tags = lazy(() => import("../Components/Tag"));
const Price = lazy(() => import("../Components/Price"));
const FavoriteIcon = lazy(() => import("../Components/FavoriteIcon"));
const NotFound = lazy(() => import("../Components/NotFound"));

// Use the useCart hook as it is
import { useCart } from "../hooks/useCart";

const FoodPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [food, setFood] = useState(null);
  const { id } = useParams();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  const handleMoveToBack = () => {
    navigate(returnUrl || "/"); // Fallback to home if returnUrl is not available
  };

  useEffect(() => {
    async function fetchFood() {
      if (id) {
        try {
          const foodData = await getById(id);
          setFood(foodData);
        } catch (error) {
          console.error("No food found for the given ID");
        }
      }
    }

    fetchFood();
  }, [id]);

  if (!food) {
    return (
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <NotFound message="Food Not Found" linkText="GO TO HOME PAGE" />
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <div
        className="food-page-container flex h-screen w-full scale-100 items-center justify-center sm:scale-75 md:scale-90"
        style={{
          backgroundImage: `url(${food.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-4/5 rounded-lg bg-white bg-opacity-70 p-4 shadow-md">
          <h1 className="mb-2 text-2xl font-bold text-gray-700">{food.name}</h1>
          <div className="mb-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <button
              className="rounded bg-blue-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
              onClick={handleMoveToBack}
            >
              Continue Fooding
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            <Suspense fallback={<div>Loading...</div>}>
              <Price price={food.price} />
            </Suspense>
            <p className="mb-4 text-gray-700">{food.description}</p>
            <Suspense fallback={<div>Loading...</div>}>
              <FavoriteIcon favorite={food.favorite} />
              <Rating size={24} stars={food.stars} />
            </Suspense>
            <div className="-m-1 flex flex-wrap">
              {food.origins?.map((origin) => (
                <Suspense key={origin} fallback={<div>Loading...</div>}>
                  <span className="m-1 rounded-full bg-gray-400 p-2">
                    {origin}
                  </span>
                </Suspense>
              ))}
            </div>
          </div>
          {food.tags && (
            <Suspense fallback={<div>Loading...</div>}>
              <Tags tags={food.tags.map((tag) => ({ name: tag }))} />
            </Suspense>
          )}
          <p className="text-sm text-gray-600">
            Time to cook about <strong>{food.cookTime}</strong> minutes
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default FoodPage;
