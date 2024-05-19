import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Price from "../Components/Price";
import Title from "../Components/Title";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" fontSize="2rem" />
      {cart.items.length === 0 ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-2xl">Your Cart is Empty!</p>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-10 rounded-lg bg-white p-5 shadow-lg">
          <div className="flex flex-col justify-between lg:flex-row">
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.food._id}
                  className="flex flex-col  justify-between border-b p-4 lg:flex-row"
                >
                  <div className="mx-5 flex w-3/4 items-center space-x-4">
                    <img
                      src={item.food.imageUrl} // Removed template literals for direct string usage
                      alt={item.food.name}
                      className="h-20 w-20 object-cover"
                    />
                    <Link
                      to={`/food/${item.food._id}`}
                      className="text-lg font-semibold hover:text-indigo-600"
                    >
                      {item.food.name}
                    </Link>
                  </div>

                  <div className="flex items-center space-x-4">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        changeQuantity(item, Number(e.target.value))
                      }
                      className="rounded border p-2"
                    >
                      {[...Array(10).keys()].map((n) => (
                        <option key={n} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </select>

                    <Price price={item.price} />
                  </div>

                  <button
                    onClick={() => removeFromCart(item.food._id)}
                    className="mx-5 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 lg:ml-4 lg:mt-0">
              <div className="flex items-center justify-between rounded bg-gray-100 p-4">
                <span className="text-lg font-semibold">Total Items:</span>
                <span className="text-lg">{cart.totalCount}</span>
              </div>
              <div className="mt-4 flex items-center justify-between rounded bg-gray-100 p-4">
                <span className="text-lg font-semibold">Total Price:</span>
                <Price price={cart.totalPrice} />
              </div>
              <Link
                to="/checkout"
                className="mt-4 block w-full rounded bg-indigo-600 p-4 text-center text-white hover:bg-indigo-700"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/"
                className="mt-4 block w-full rounded bg-indigo-600 p-4 text-center text-white hover:bg-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
