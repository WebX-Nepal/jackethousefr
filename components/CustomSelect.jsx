import React from "react";

const CustomSelectComponent = ({ options, defaultValue, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
      className="border rounded-md p-2"
    >
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
export default CustomSelectComponent;
