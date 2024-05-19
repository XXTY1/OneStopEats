import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createOrder } from "../services/orderService";
import { toast } from "react-toastify";
import Input from "../Components/Input";
import Title from "../Components/Title";
import Button from "../Components/Button";
import Price from "../Components/Price";
import Map from "../Components/Map";

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning("Please select your location on the map");
      return;
    }
    await createOrder({ ...order, name: data.name, address: data.address });
    navigate("/payment");
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="container mx-auto rounded-lg bg-white p-6 shadow-md"
    >
      {/* User Details and Map in one div */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* User Details */}
        <div>
          <Title title={"Your Details"} fontSize={"text-2xl"} />
          <Input
            defaultValue={user.name}
            label={"Name"}
            {...register("name")}
            className="mb-4"
            error={errors.name}
          />
          <Input
            defaultValue={user.address}
            label={"Address"}
            {...register("address")}
            className="mb-4"
            error={errors.address}
          />
          {/* Map */}
          <Title title={"Choose the location on map"} fontSize={"text-2xl"} />
          <div className="aspect-w-1 aspect-h-1">
            <Map
              location={order.addressLatLng}
              onChange={(latlng) => {
                setOrder({ ...order, addressLatLng: latlng });
              }}
              readonly={false}
            />
          </div>
        </div>

        {/* Order Items */}
        <div>
          <Title title={"Order Items:"} fontSize={"text-2xl"} />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.food._id}>
                    <td>
                      <Link to={`/food/${item.food._id}`}>
                        <img
                          src={item.food.imageUrl}
                          alt={item.food.name}
                          className="h-20 w-20 object-cover"
                        />
                      </Link>
                    </td>
                    <td className="px-4 py-2">{item.food.name}</td>
                    <td className="px-4 py-2">
                      <Price price={item.food.price} />
                    </td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">
                      <Price price={item.price} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"></td>
                  <td className="px-4 py-2">
                    <strong>Total :</strong>
                  </td>
                  <td className="px-4 py-2">
                    <Price price={order.totalPrice} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Go to Payment Button */}
          <Button
            type="submit"
            text="Go to Payment"
            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 md:w-auto"
          />
        </div>
      </div>
    </form>
  );
};

export default Checkout;
