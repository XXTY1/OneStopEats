// Define a functional component named Button with default properties
export default function Button({
  // Set default values for the button's properties
  type = "button", // The type of button, with a default value of "button"
  text = "Submit", // The text displayed on the button, with a default value of "Submit"
  onClick, // The function to call when the button is clicked
  colorClass = "text-white", // The color class for the text, with a default value for white text
  bgClass = "bg-teal-500", // The background color class, with a default value for teal
  fontSizeClass = "text-lg", // The font size class, with a default value for large text
  widthClass = "w-30", // The width class, with a default value that sets the width
  heightClass = "h-10", // The height class, with a default value that sets the height
  extraClasses = "shadow-lg", // Additional classes for styling, with a default value for a large shadow
}) {
  // Return JSX to render the button
  return (
    // A div that centers its children horizontally using Flexbox
    <div className="flex justify-center">
      {/* The button element with dynamic classes and event handlers */}
      <button
        // Use template literals to inject the dynamic classes into the className string
        // Combine utility classes from a CSS framework like Tailwind CSS for styling
        // Include classes for focus, hover, and transition effects
        className={`focus:shadow-outline transform rounded px-2 py-1 font-bold transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-y-105 focus:outline-none ${colorClass} ${bgClass} ${fontSizeClass} ${widthClass} ${heightClass} ${extraClasses}`}
        type={type} // Set the button's type attribute to the passed-in type prop
        onClick={onClick} // Set the button's onClick event handler to the passed-in onClick function
      >
        {text} {/* Display the passed-in text inside the button */}
      </button>
    </div>
  );
}
