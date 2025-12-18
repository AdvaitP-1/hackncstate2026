import React from "react";

export const Button = React.forwardRef(function Button(
  { className = "", ...props },
  ref
) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
});
