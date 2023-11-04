"use client";
import { useRouter } from "next/navigation";

const Branches = () => {
  const router = useRouter();
  const a = [
    { name: "branch1", address: "branch1" },
    { name: "branch2", address: "branch2" },
    { name: "branch3", address: "branch3" },
    { name: "branch4", address: "branch4" },
  ];

  return (
    <div className="p-0 sm:p-2">
      <div className="flex py-6 px-10 justify-between">
        <h4 className="text-xl font-semibold text-black">Branches</h4>
        <button className="px-6  bg-black text-white py-1 rounded-lg">
          Add Branches
        </button>
      </div>
      <div className="w-full flex items-center justify-center px-1 sm:px-10 flex-col">
        {a.map((item, index) => {
          return (
            <div
              className="bg-primary w-full h-16 rounded-xl flex justify-between items-center px-6 mb-6 shadow-md hover:shadow-xl hover:cursor-pointer"
              key={index}
            >
              <p>{item.name}</p>
              <p className="hidden sm:block">{item.address}</p>
              <button
                className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                type="button"
                onClick={() => {
                  router.push("branches/branchDetails");
                }}
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
