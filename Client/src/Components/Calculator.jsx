import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  // Function to handle keydown events
  const handleKeyDown = (e) => {
    const key = e.key;

    if (key === "Enter") {
      handleButtonClick("=");
    } else if (key === "Delete") {
      handleButtonClick("C");
    } else if ("0123456789+-*/.".includes(key)) {
      handleButtonClick(key);
    }
  };

  // Attach event listener on component mount
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle button clicks
  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        // Use eval carefully; consider a safer alternative
        const evalResult = eval(input);
        setInput(evalResult.toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border bg-white p-6 shadow-lg">
      <div className="mb-4 text-right text-2xl">
        <div className="flex justify-center">
          <input
            type="text"
            className="w-full rounded border bg-gray-200 p-2 text-right"
            value={input || "0"}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("7")}
        >
          7
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("8")}
        >
          8
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("9")}
        >
          9
        </button>
        <button
          className="rounded bg-red-500 p-4 text-white"
          onClick={() => handleButtonClick("C")}
        >
          C
        </button>

        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("6")}
        >
          6
        </button>
        <button
          className="rounded bg-orange-500 p-4 text-white"
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>

        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          className="rounded bg-orange-500 p-4 text-white"
          onClick={() => handleButtonClick("*")}
        >
          *
        </button>

        <button
          className="col-span-2 rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          className="rounded bg-gray-200 p-4"
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
        <button
          className="rounded bg-orange-500 p-4 text-white"
          onClick={() => handleButtonClick("-")}
        >
          -
        </button>
        <button
          className="rounded bg-orange-500 p-4 text-white"
          onClick={() => handleButtonClick("+")}
        >
          +
        </button>
        <button
          className="col-span-4 rounded bg-blue-500 p-4 text-white"
          onClick={() => handleButtonClick("=")}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
