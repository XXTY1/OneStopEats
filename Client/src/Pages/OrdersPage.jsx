import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { getAll, getAllStatus } from "../services/orderService.js";
import Title from "../Components/Title";
import DateTime from "../Components/DateTime";
import Price from "../Components/Price";
import NotFound from "../Components/NotFound";

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ALL_STATUS_FETCHED":
      return { ...state, allStatus: payload };
    case "ORDERS_FETCHED":
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const [{ allStatus, orders }, dispatch] = useReducer(reducer, initialState);

  const { filter } = useParams();

  useEffect(() => {
    getAllStatus().then((status) => {
      dispatch({ type: "ALL_STATUS_FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDERS_FETCHED", payload: orders });
    });
  }, [filter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Title title="Orders"  fontSize={"40px"}/>

      {allStatus && (
        <div className="mb-4 flex flex-wrap justify-center">
          <Link
            to="/orders"
            className={`p-2 ${!filter ? "bg-blue-500 text-white" : "text-blue-500"}`}
          >
            All
          </Link>
          {allStatus.map((state) => (
            <Link
              key={state}
              className={`p-2 ${state == filter ? "bg-blue-500 text-white" : "text-blue-500"}`}
              to={`/orders/${state}`}
            >
              {state}
            </Link>
          ))}
        </div>
      )}

      {orders?.length === 0 && (
        <NotFound
          linkRoute={filter ? "/orders" : "/"}
          linkText={filter ? "Show All" : "Go To Home Page"}
        />
      )}

      {orders &&
        orders.map((order) => (
          <div key={order.id} className="mb-4 border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-bold">{order.id}</span>
              <span>
                <DateTime date={order.createdAt} />
              </span>
              <span className="text-blue-500">{order.status}</span>
            </div>
            <div className="mb-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {order.items.map((item) => (
                <Link key={item.food._id} to={`/food/${item.food._id}`}>
                  <img
                    src={item.food.imageUrl}
                    alt={item.food.name}
                    className="h-auto w-full"
                  />
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link to={`/track/${order.id}`} className="text-blue-500">
                  Show Order
                </Link>
              </div>
              <div>
                <span className="font-bold">
                  <Price price={order.totalPrice} />
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
