import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-wrap justify-center">
      {allItems
        .filter((item) => user.isAdmin || !item.forAdmin)
        .map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className={`m-4 p-4 text-white rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${item.bgColor}`}
          >
            <img className="w-16 h-16 mx-auto" src={item.imageUrl} alt={item.title} />
            <h2 className="text-center">{item.title}</h2>
          </Link>
        ))}
    </div>
  );
}

const allItems = [
  {
    title: "Orders",
    imageUrl: "/icons/orders.svg",
    url: "/orders/PAYED",
    bgColor: "bg-pink-600",
    color: "white", 
  },
  {
    title: "Profile",
    imageUrl: "/icons/profile.svg",
    url: "/profile",
    bgColor: "bg-blue-700",
    color: "white",
  },
  {
    title: "Users",
    imageUrl: "/icons/users.svg",
    url: "/admin/users",
    forAdmin: true,
    bgColor: "bg-teal-600",
    color: "white",
  },
  {
    title: "Foods",
    imageUrl: "/icons/foods.svg",
    url: "/admin/foods",
    forAdmin: true,
    bgColor: "bg-purple-500",
    color: "white",
  },
];
