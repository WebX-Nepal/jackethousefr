import Select from "react-select";

const CustomSelect = ({ onChange, value, placeholder }) => {
  const customStyles = {
    outline: "none !important",
    boxShadow: "none", // Remove box shadow on focus
    control: (provided) => ({
      ...provided,

      backgroundColor: "white", // Change the background color of the control
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "lightblue", // Change the background color of selected options
    }),
  };
  const options = [
    { value: "red", label: "red " },
    { value: "green", label: "green" },
    { value: "blue", label: "blue" },
    { value: "black", label: "black" },
    { value: "white", label: "white" },
  ];
  return (
    <Select
      options={options}
      isMulti // Enable multiple selections
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      styles={customStyles}
      className="w-full h-full p-1 outline-none border-none"
      // Apply custom styles
    />
  );
};

export default CustomSelect;
