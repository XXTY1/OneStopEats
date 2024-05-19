// Import the React library to build components and the useAuth custom hook for authentication logic
import React from "react";
import { useAuth } from "../hooks/useAuth";

// Import the NotFound component to display a message when a page is not accessible
import NotFound from "../Components/NotFound";
// Import the AuthRoute component to protect routes that require authentication
import AuthRoute from "../Components/AuthRoute";

// Define a functional component named AdminRoute to restrict access to admin users
function AdminRoute({ children }) {
  // Retrieve the current user's information from the useAuth hook
  const { user } = useAuth();

  // Check if the user has admin privileges
  // If the user is an admin, render the children components passed to AdminRoute
  // If the user is not an admin, render the NotFound component with a custom message and a link to the dashboard
  return user.isAdmin ? (
    children
  ) : (
    <NotFound
      linkRoute="/dashboard" // The route to navigate to when the link is clicked
      linkText="Go to Dashboard" // The text displayed for the link
      message="You don't have access to this page" // The message informing the user they don't have access
    />
  );
}

// Define a higher-order component named AdminRouteExport
// This component wraps the AdminRoute inside the AuthRoute component
// AuthRoute ensures that the user is authenticated before checking for admin privileges
const AdminRouteExport = ({ children }) => (
  <AuthRoute>
    {" "}
    {/* AuthRoute checks if the user is authenticated */}
    <AdminRoute>{children}</AdminRoute>{" "}
    {/* AdminRoute checks if the user is an admin */}
  </AuthRoute>
);

// Export the AdminRouteExport component as the default export of this module
// This makes it available for use in other parts of the application, particularly for protecting routes that should only be accessible by admin users
export default AdminRouteExport;
