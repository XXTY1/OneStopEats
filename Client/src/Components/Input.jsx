import React from "react";
import InputContainer from "./InputContainer";

function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref,
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    //defaults
    switch (error.type) {
      case "required":
        return "This Field Is Required";
      case "minLength":
        return "Field Is Too Short";
      default:
        return "*";
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className="form-input focus:shadow-outline-blue block w-full rounded-md border border-gray-300 px-3 py-1 text-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none"
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && (
        <div className="mt-2 text-xs italic text-red-500">
          {getErrorMessage()}
        </div>
      )}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
