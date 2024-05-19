import React, { useState, useEffect } from "react";
import { getNewOrderForCurrentUser } from "../services/orderService";
import Title from "../Components/Title";
// import OrderItemsList from '../components/OrderItemsList/OrderItemsList';
import Map from "../Components/Map";
import PaypalButtons from "../Components/PaypalButtons";

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="content w-full p-4 md:w-1/2">
          <Title title="Order Form" fontSize="text-xl" />
          <div className="summary my-4 rounded border border-gray-200 p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold">Name:</h3>
              <span className="text-gray-600">{order.name}</span>
            </div>
            <div className="mb-3">
              <h3 className="text-lg font-semibold">Address:</h3>
              <span className="text-gray-600">{order.address}</span>
            </div>
            <div className="paypal-buttons mt-4">
              <PaypalButtons order={order} />
            </div>
          </div>
          {/* <OrderItemsList order={order} /> */}
        </div>

        <div className="map w-full p-4 md:w-1/2">
          <Title title="Your Location" fontSize="text-xl" />
          <Map
            readonly={true}
            location={order.addressLatLng}
            className="h-64 w-full"
          />
        </div>
      </div>
    </div>
  );
}
