// Import hooks from React for managing state and context within the application
import React, { createContext, useContext, useEffect, useState } from "react";

// Create a Context object that will be used to provide cart data to other components
const CartContext = createContext(null);

// Define a constant key that will be used to store and retrieve cart data from localStorage
const CART_KEY = "cart";

// Define the structure of an empty cart with no items and zero total price and count
const EMPTY_CART = {
  items: [], // An empty array to hold cart items
  totalPrice: 0, // The total price of all items in the cart initialized to zero
  totalCount: 0, // The total count of all items in the cart initialized to zero
};

// CartProvider is a component that wraps its children and provides them with cart context data
export default function CartProvider({ children }) {
  // Initialize the cart state based on data retrieved from localStorage
  const initCart = getCartFromLocalStorage();

  // State variables to keep track of cart items, total price, and total count
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  // useEffect hook to perform side effects, in this case, updating localStorage when cartItems change
  useEffect(() => {
    // Calculate the new total price and count based on cart items
    const newTotalPrice = sum(cartItems.map((item) => item.price));
    const newTotalCount = sum(cartItems.map((item) => item.quantity));

    // Update the totalPrice and totalCount state variables
    setTotalPrice(newTotalPrice);
    setTotalCount(newTotalCount);

    // Persist the updated cart data to localStorage
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice: newTotalPrice,
        totalCount: newTotalCount,
      }),
    );
  }, [cartItems]);

  // Function to retrieve the cart data from localStorage or return an empty cart if none exists
  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  // Helper function to sum an array of numbers
  const sum = (items) => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  // Function to remove an item from the cart based on its unique food ID
  const removeFromCart = (foodId) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.food._id !== foodId,
    );
    setCartItems(filteredCartItems);
  };

  // Function to change the quantity of a specific item in the cart
  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.food._id === food._id ? changedCartItem : item,
      ),
    );
  };

  // Function to add a food item to the cart or increase its quantity if it already exists
  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food._id === food._id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  // Function to clear all items from the cart and reset the cart state
  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCartItems(EMPTY_CART.items);
    setTotalPrice(EMPTY_CART.totalPrice);
    setTotalCount(EMPTY_CART.totalCount);
  };

  // Render the CartContext.Provider component, passing down the cart state and functions as value
  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Define a custom hook called useCart to provide easy access to the CartContext data
export const useCart = () => useContext(CartContext);
