// Import necessary hooks from react-router-dom for navigation and location handling
import { Navigate, useLocation } from "react-router-dom";
// Import the useAuth custom hook to check the authentication status
import { useAuth } from "../hooks/useAuth.jsx";

// React is imported to recognize the JSX syntax and use the Children API if needed
// However, the Children import is not used in this code snippet
import { Children } from "react";

// Define a functional component named AuthRoute that will wrap around any child components
export default function AuthRoute({ children }) {
  // useLocation hook to get the current location object
  const location = useLocation();
  // useAuth hook to get the current user's authentication status
  const { user } = useAuth();

  // Conditional rendering based on the user's authentication status
  // If the user object exists (truthy), it means the user is authenticated
  // In this case, render the children components passed to AuthRoute
  // If the user object does not exist (falsy), it means the user is not authenticated
  // In this case, render the Navigate component to redirect the user to the login page
  // The URL to return to after logging in is passed as a query parameter 'returnUrl'
  // The 'replace' prop in Navigate replaces the current entry in the history stack
  // This prevents the user from returning to the previous route using the back button
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
