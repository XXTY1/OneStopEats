// Import hooks from React needed for state management and context
import { useState, createContext, useContext } from "react";
// Import userService to handle operations related to user authentication
import * as userService from "../services/user.service.js";
// Import toast from react-toastify for showing notifications
import { toast } from "react-toastify";

// Create a context for authentication data
const AuthContext = createContext(null);

/**
 * AuthProvider is a component that provides authentication-related data and methods
 * to its child components using React Context. It manages the authentication state
 * and exposes functions to log in, log out, register, update profile, and change password.
 */
export const AuthProvider = ({ children }) => {
  // Initialize user state with the current user data (if any)
  const [user, setUser] = useState(userService.getUser());

  /**
   * Handles user login with provided credentials.
   * On success, updates the user state and shows a success notification.
   * On failure, shows an error notification.
   */
  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  /**
   * Handles user registration with provided data.
   * On success, updates the user state and shows a success notification.
   * On failure, shows an error notification.
   */
  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Register Successful");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  /**
   * Logs out the user, clears the user state, and shows a success notification.
   */
  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logout Successful");
  };

  /**
   * Updates the user profile with provided data.
   * On success, updates the user state and shows a success notification.
   */
  const updateProfile = async (user) => {
    const updatedUser = await userService.updateProfile(user);
    toast.success("Profile Update Was Successful");
    if (updatedUser) setUser(updatedUser);
  };

  /**
   * Changes the user's password with provided new passwords.
   * After changing the password, logs the user out and shows a success notification.
   */
  const changePassword = async (passwords) => {
    await userService.changePassword(passwords);
    logout();
    toast.success("Password Changed Successfully, Please Login Again!");
  };

  // Render the AuthContext provider with the defined functions and user state
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook that simplifies the process of accessing the AuthContext.
 * It allows any component within the AuthProvider to access the authentication state and functions.
 */
export const useAuth = () => useContext(AuthContext);
