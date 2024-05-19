import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header.jsx";
import OrderTrackPage from "./Pages/OrderTrackPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Home from "./Pages/Home.jsx";
import FoodPage from "./Pages/FoodPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import CartProvider from "./hooks/useCart.jsx";
import Cart from "./Pages/Cart.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login.jsx";
import "./axiosConfig.js";
import Register from "./Pages/Register.jsx";
import { LoadingProvider } from "./hooks/useLoading.jsx";
import Checkout from "./Pages/Checkout.jsx";
import AuthRoute from "./Components/AuthRoute.jsx";
import "../src/interceptors/authInterceptor.js";
import Payment from "./Pages/Payment.jsx";
import OrdersPage from "./Pages/OrdersPage.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import FoodAdminPage from "./Pages/FoodAdminPage.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import FoodEditPage from "./Pages/FoodEditPage.jsx";
import UsersPage from "./Pages/UsersPage.jsx";
import UserEditPage from "./Pages/UserEditPage.jsx";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:searchTerm" element={<Home />} />
            <Route path="/tag/:tag" element={<Home />} />
            <Route path="/food/:id" element={<FoodPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/checkout"
              element={
                <AuthRoute>
                  <Checkout />
                </AuthRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <AuthRoute>
                  <Payment />
                </AuthRoute>
              }
            />
            <Route
              path="/track/:orderId"
              element={
                <AuthRoute>
                  <OrderTrackPage />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />
            <Route
              path="/orders/:filter"
              element={
                <AuthRoute>
                  <OrdersPage />
                </AuthRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthRoute>
                  <Dashboard />
                </AuthRoute>
              }
            />
            <Route
              path="/admin/foods/:searchTerm?"
              element={
                <AdminRoute>
                  <FoodAdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/editFood/:foodId"
              element={
                <AdminRoute>
                  <FoodEditPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/addFood"
              element={
                <AdminRoute>
                  <FoodEditPage />
                </AdminRoute>
              }
            />
             <Route
              path="/admin/users/:searchTerm?"
              element={
                <AdminRoute>
                  <UsersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/editUser/:userId"
              element={
                <AdminRoute>
                  <UserEditPage />
                </AdminRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </LoadingProvider>
    </AuthProvider>
  </CartProvider>,
);
