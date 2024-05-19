// Import the React library for building components
import React from "react";

// Set default properties for the DateTime component
DateTime.defaultProps = {
  // Default formatting options for displaying the date and time
  options: {
    weekday: "short", // Abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // Numeric year (e.g., '2021')
    month: "long", // Full month name (e.g., 'January')
    day: "numeric", // Numeric day of the month (e.g., '1')
    hour: "numeric", // Numeric hour (e.g., '13')
    minute: "numeric", // Numeric minute (e.g., '15')
    second: "numeric", // Numeric second (e.g., '30')
  },
};

// Define the DateTime functional component
export default function DateTime({
  // Destructure props to extract the date and formatting options
  date, // The date to be formatted
  options: { weekday, year, month, day, hour, minute, second }, // Individual formatting options
}) {
  // Determine the current locale of the user's environment
  var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  // Define a function to format the date according to the current locale and options
  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      year, // Use the year format from props or default
      month, // Use the month format from props or default
      weekday, // Use the weekday format from props or default
      day, // Use the day format from props or default
      hour, // Use the hour format from props or default
      minute, // Use the minute format from props or default
      second, // Use the second format from props or default
    }).format(Date.parse(date)); // Parse the date string and format it

  // Render the formatted date
  return <>{getDate()}</>; // Call the getDate function and render the result
}
