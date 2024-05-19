import React from "react";
import { Link } from "react-router-dom";
import Price from "../Components/Price";

export default function OrderItemList({ order }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr>
            <th colSpan="5" className="text-left text-lg font-semibold">
              Order Items:
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <tr key={item.food.id} className="bg-white">
              <td className="whitespace-nowrap p-4">
                <Link to={`/food/${item.food._id}`}>
                  <img
                    src={item.food.imageUrl}
                    alt={item.food.name}
                    className="h-20 w-20 object-cover"
                  />
                </Link>
              </td>
              <td className="whitespace-nowrap p-4">{item.food.name}</td>
              <td className="whitespace-nowrap p-4">
                <Price price={item.food.price} />
              </td>
              <td className="whitespace-nowrap p-4">{item.quantity}</td>
              <td className="whitespace-nowrap p-4">
                <Price price={item.price} />
              </td>
            </tr>
          ))}
          <tr className="bg-white">
            <td colSpan="3" className="whitespace-nowrap p-4"></td>
            <td className="whitespace-nowrap p-4 font-bold">Total :</td>
            <td className="whitespace-nowrap p-4">
              <Price price={order.totalPrice} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
