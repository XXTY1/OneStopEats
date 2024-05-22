import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAll, toggleBlock } from "../services/user.service";
import Title from "../Components/Title";
import Search from "../Components/Search";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { searchTerm } = useParams();
  const auth = useAuth();

  useEffect(() => {
    loadUsers();
  }, [searchTerm]);

  const loadUsers = async () => {
    const users = await getAll(searchTerm);
    setUsers(users);
  };

  const handleToggleBlock = async (userId) => {
    const isBlocked = await toggleBlock(userId);
    setUsers((oldUsers) =>
      oldUsers.map((user) =>
        user.id === userId ? { ...user, isBlocked } : user
      )
    );
  };

  return (
    <div className="container mx-auto px-4">
      <Title title="Manage Users" />
      <Search
        searchRoute="/admin/users/"
        defaultRoute="/admin/users"
        placeholder="Search Users"
      />
      <div className="flex flex-wrap -m-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <div className="h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                  USER ID: {user.id}
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  Name: {user.name}
                </h1>
                <p className="leading-relaxed mb-3">Email: {user.email}</p>
                <p className="leading-relaxed mb-3">Address: {user.address}</p>
                <p className="leading-relaxed mb-3">
                  Admin: {user.isAdmin ? "✅" : "❌"}
                </p>
                <div className="flex items-center flex-wrap ">
                  <Link
                    to={"/admin/editUser/" + user.id}
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-indigo-600"
                  >
                    Edit
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  {auth.user.id !== user.id && (
                    <button
                      onClick={() => handleToggleBlock(user.id)}
                      className={`ml-4 inline-flex items-center ${user.isBlocked ? 'bg-red-100 text-red-500 hover:bg-red-200' : 'bg-green-100 text-green-500 hover:bg-green-200'} border-0 py-1 px-3 focus:outline-none rounded`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
