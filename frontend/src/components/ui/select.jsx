import React from "react";

// Root Select
export const Select = ({ children }) => {
  return <div>{children}</div>;
};

// Trigger (button)
export const SelectTrigger = ({ children }) => {
  return <button>{children}</button>;
};

// Value display
export const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

// Content dropdown
export const SelectContent = ({ children }) => {
  return <div>{children}</div>;
};

// Item
export const SelectItem = ({ value, children }) => {
  return <div>{children}</div>;
};

export default Select;