export default function InputContainer({ label, bgColor, children }) {
  // Define a mapping for background colors
  const bgColors = {
    rose: "bg-rose-100",
    blue: "bg-blue-500",
    green: "bg-green-500",
    transparent: "bg-transparent",
    // Add more colors as needed
  };

  return (
    <div
      className={`${bgColors[bgColor] || bgColors.rose} rounded-lg p-2 shadow-lg transition duration-300 ease-in-out hover:shadow-2xl`}
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="">{children}</div>
    </div>
  );
}

// Usage example:
// <InputContainer label="Name" bgColor="red">{/* children here */}</InputContainer>
