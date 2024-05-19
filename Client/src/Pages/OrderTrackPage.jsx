import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrderById } from "../services/orderService";
import NotFound from "../Components/NotFound";
import DateTime from "../Components/DateTime";
import OrderItemsList from "../Components/OrderItemList";
import Title from "../Components/Title";
import Map from "../Components/Map";

export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then((order) => {
        setOrder(order);
      });
  }, [orderId]);

  if (!orderId)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  return (
    order && (
      <div className="container mx-auto p-4">
        <div className="content mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <h1 className="mb-2 text-xl font-bold">Order #{order.id}</h1>
          <div className="header mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <strong>Date:</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Name:</strong>
              {order.name}
            </div>
            <div>
              <strong>Address:</strong>
              {order.address}
            </div>
            <div>
              <strong>Status:</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID:</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} />
        </div>

        <div className="location-info my-4">
          <Title title="Your Location" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>

        {order.status === "NEW" && (
          <div className="payment my-4 text-center">
            <Link
              to="/payment"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Go To Payment
            </Link>
          </div>
        )}
      </div>
    )
  );
}
