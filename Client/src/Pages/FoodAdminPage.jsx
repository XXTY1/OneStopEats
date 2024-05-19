import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteById, getAll, search } from "../services/foodService";
import NotFound from "../Components/NotFound";
import Title from "../Components/Title";
import Search from "../Components/Search";
import Price from "../Components/Price";
import { toast } from "react-toastify";

export default function FoodsAdminPage() {
  const [foods, setFoods] = useState();
  const { searchTerm } = useParams();

  useEffect(() => {
    loadFoods();
  }, [searchTerm]);

  const loadFoods = async () => {
    const foods = searchTerm ? await search(searchTerm) : await getAll();
    setFoods(foods);
  };

  const FoodsNotFound = () => {
    if (foods && foods.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/foods" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };

  const deleteFood = async (food) => {
    const confirmed = window.confirm(`Delete Food ${food.name}?`);
    if (!confirmed) return;

    await deleteById(food._id);
    toast.success(`"${food.name}" Has Been Removed!`);
    setFoods(foods.filter((f) => f._id !== food._id));
  };

  return (
    <div className="">
      <div className="flex flex-col ">
        <Search
          searchRoute="/admin/foods/"
          defaultRoute="/admin/foods"
          placeholder="Search Foods"
        />
        <div className="flex justify-center p-5">
          <Link
            to="/admin/addFood"
            className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Add Food +
          </Link>
        </div>
        <FoodsNotFound />
        <div className="flex flex-wrap">
          {foods &&
            foods.map((food) => (
              <div
                key={food._id}
                className="my-4 flex w-full flex-col items-center justify-between rounded-lg bg-white p-4 shadow-lg md:w-1/2 md:flex-row lg:w-1/3"
              >
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="h-[10rem] w-[20rem] rounded-lg object-cover md:h-[5rem] md:w-[10rem]"
                />
                <div className="w-full p-4 md:w-2/3">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        to={"/food/" + food._id}
                        className="text-2xl text-purple-500"
                      >
                        {food.name}
                      </Link>
                    </div>
                    <div>
                      <Price price={food.price} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={"/admin/editFood/" + food._id}
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => deleteFood(food)}
                      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
