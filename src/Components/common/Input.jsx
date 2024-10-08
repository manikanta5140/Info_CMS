import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    name = "",
    type = "text",
    className = "",
    placeholder = "",
    error = "",
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full relative ${disabled ? "opacity-50" : ""}`}>
      <input
        autoComplete="off"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder || " "}
        ref={ref}
        required={required}
        disabled={disabled}
        className={`peer text-primary bg-primary rounded-md placeholder-gray-100 h-10 w-full  
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:borer-rose-600"
          }
          ${disabled ? "cursor-not-allowed" : ""}
          text-gray-900 focus:outline-none ${className}`}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={`absolute left-0 -top-6 text-primary text-sm 
            peer-placeholder-shown:text-base peer-placeholder-shown:text-primary
            peer-placeholder-shown:top-2 transition-all  peer-placeholder-shown:pl-2
            ${
              error
                ? "text-red-500"
                : "peer-focus:text-primary peer-focus:text-sm"
            }`}
        >
          {label}
        </label>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
