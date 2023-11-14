// SelectComponent.js
import React from "react";
import { useController } from "react-hook-form";

const SelectComponent = ({ control, name, options }) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  });
  console.log("optionsara", options);
  return (
    <div className="border border-gray-600 rounded-xl flex items-center justify-center">
      <select
        id={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
      >
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
