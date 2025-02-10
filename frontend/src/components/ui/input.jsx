import React from "react";

const Input = React.forwardRef((props, ref) => {
  const { className = "", type = "text", ...otherProps } = props;

  const baseStyles = `
    flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm
    transition-colors placeholder:text-gray-500 
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    disabled:cursor-not-allowed disabled:opacity-50
    dark:border-gray-800 dark:bg-gray-950 dark:placeholder:text-gray-400
    dark:focus:ring-red-500
  `;

  const combinedClassName = `${baseStyles} ${className}`.trim();

  return (
    <input
      type={type}
      className={combinedClassName}
      ref={ref}
      {...otherProps}
    />
  );
});

Input.displayName = "Input";

export { Input };