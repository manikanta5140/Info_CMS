import React, { useId } from "react";

const Input = React.forwardRef(function Input(
 { label, type = "text", className = "", placeholder = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
});
export default Input;
