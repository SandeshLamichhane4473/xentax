// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-primary text-white hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};
