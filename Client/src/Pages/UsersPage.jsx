import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAll, toggleBlock } from "../services/user.service";
import Title from "../Components/Title";
import Search from "../Components/Search";

export default function UsersPage() {
  const [users, setUsers] = useState();
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
        user.id === userId ? { ...user, isBlocked } : user,
      ),
    );
  };

  return (
    <div className="">
      <Title title="Manage Users" />
      <Search
        searchRoute="/admin/users/"
        defaultRoute="/admin/users"
        placeholder="Search Users"
      />
      <div className="m-8 flex flex-wrap space-y-3 rounded-md bg-slate-100 p-8 shadow-md">
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              className=" w-[20rem] h-[13rem] m-10 p-5 bg-slate-200 rounded-md"
            >
              <div className="mb-2 text-lg font-semibold">
                Name: {user.name}
              </div>
              <div className="mb-2">Email: {user.email}</div>
              <div className="mb-2">Address: {user.address}</div>
              <div className="mb-2">Admin: {user.isAdmin ? "✅" : "❌"}</div>
              <div>
                <Link
                  to={"/admin/editUser/" + user.id}
                  className="mr-4 text-blue-800 hover:underline"
                >
                  Edit
                </Link>
                {auth.user.id !== user.id && (
                  <Link
                    onClick={() => handleToggleBlock(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
