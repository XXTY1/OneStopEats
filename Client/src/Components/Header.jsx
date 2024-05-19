import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const UserMenu = ({ user, logout }) => {
  useEffect(() => {}, [user]);

  return (
    <div className="group relative  ">
      <Link
        to="/dashboard"
        className="group px-4 py-2 text-sm font-medium text-gray-700 duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {user.name}
      </Link>
      <ul className="right-50 absolute z-10 mt-2 hidden rounded-md bg-white py-1 shadow-lg transition-all delay-700 group-hover:block">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/orders/PAYED"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Orders
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

const Header = () => {
  const { cart } = useCart();

  const { user, logout } = useAuth();

  const [render, setRender] = useState(true);

  useEffect(() => {
    {
      setRender(!render);
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-[1010] bg-white bg-opacity-50 shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              OneStop Eats
            </Link>
          </div>
          <nav className="flex items-center">
            <ul className="flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} logout={logout} />
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/cart"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cart
                  {cart.totalCount > 0 && (
                    <span className="ml-1 rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                      {cart.totalCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
