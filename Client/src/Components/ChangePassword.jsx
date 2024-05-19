// Import React and necessary hooks and components
import React from "react"; // React library for building UI components
import { useForm } from "react-hook-form"; // Hook for form handling
import Title from "../Components/Title"; // Custom Title component for displaying titles
import Input from "../Components/Input"; // Custom Input component for form inputs
import Button from "../Components/Button"; // Custom Button component for submit button
import { useAuth } from "../hooks/useAuth"; // Custom hook for authentication-related actions

// Define a functional component named ChangePassword for changing user passwords
export default function ChangePassword() {
  // Destructure methods from useForm hook for form handling
  const {
    handleSubmit, // Function to handle form submission
    register, // Function to register input fields
    getValues, // Function to get input values
    formState: { errors }, // Object to access form errors
  } = useForm();

  // Destructure changePassword function from useAuth hook to submit new password
  const { changePassword } = useAuth();

  // Define a function to handle form submission
  const submit = (passwords) => {
    changePassword(passwords); // Call changePassword with the form data
  };

  // Render the form UI
  return (
    // Container div with styling for full-screen height, center alignment, and background color
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* Inner div with width constraints */}
      <div className="w-full max-w-xs">
        {/* Title component displaying the form title */}
        <Title title="Change Password" />
        {/* Form element with onSubmit event handler */}
        <form
          onSubmit={handleSubmit(submit)} // Call handleSubmit with the submit function on form submission
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md" // Styling classes for the form
        >
          {/* Input component for current password */}
          <Input
            type="password" // Set input type to password
            label="Current Password" // Label for the input
            {...register("currentPassword", { // Register input for form handling
              required: true, // Make this field required
            })}
            error={errors.currentPassword} // Pass any errors related to this field
            className="mb-4" // Margin bottom class
          />

          {/* Input component for new password */}
          <Input
            type="password" // Set input type to password
            label="New Password" // Label for the input
            {...register("newPassword", { // Register input for form handling
              required: true, // Make this field required
              minLength: 5, // Set minimum length validation
            })}
            error={errors.newPassword} // Pass any errors related to this field
            className="mb-4" // Margin bottom class
          />

          {/* Input component for confirming new password */}
          <Input
            type="password" // Set input type to password
            label="Confirm Password" // Label for the input
            {...register("confirmNewPassword", { // Register input for form handling
              required: true, // Make this field required
              validate: (value) => // Custom validation function
                value !== getValues("newPassword") // Check if this value matches the new password
                  ? "Passwords Do No Match" // If not, return error message
                  : true, // If matches, return true
            })}
            error={errors.confirmNewPassword} // Pass any errors related to this field
            className="mb-6" // Margin bottom class
          />

          {/* Button component for form submission */}
          <Button
            type="submit" // Set button type to submit
            text="Change" // Text displayed on the button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none" // Styling classes for the button
          />
        </form>
      </div>
    </div>
  );
}
