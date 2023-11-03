import React from "react";

const Branches = () => {
  const a = [
    { name: "branch1", address: "branch1" },
    { name: "branch2", address: "branch2" },
    { name: "branch3", address: "branch3" },
    { name: "branch4", address: "branch4" },
  ];

  return (
    <div className="p-2">
      <h4 className="text-xl font-semibold text-black py-6 px-4">Branches</h4>
      <div className="w-full flex items-center justify-center px-10 flex-col">
        {a.map((item, index) => {
          return (
            <div
              className="bg-primary w-full h-16 rounded-xl flex justify-between items-center px-6 mb-6 shadow-md"
              key={index}
            >
              <p>{item.name}</p>
              <p>{item.address}</p>
              <button
                className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                type="button"
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Branches;
