import React from "react";

function Profile() {
  return (
    <div className="h-full bg-primary m-4 z-10 shadow-lg p-4">
      <div className="flex p-4">
        <div className="w-[200px] h-[200px] bg-red-300 rounded-full "></div>
        <div className="ml-20 mt-8">
          <p className="text-3xl">Branch Admin Name</p>
          <p className="text-2xl pt-1">Branch Admin Number</p>
          <p className="text-2xl text-blue-600 pt-1">Branch Name</p>
          <p className="text-2xl pt-1">Branch Location</p>
        </div>
      </div>
      <p className="px-6 text-xl font-bold pt-6">Account</p>
      <div className="grid grid-cols-2 p-4">
        <div className="flex  w-11/12 justify-between p-2">
          <p className="text-xl flex items-center justify-center">
            Branch Name
          </p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Branch Name"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between p-2">
          <p className="text-xl flex items-center justify-center">
            Branch Address
          </p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Branch Address"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between p-2">
          <p className="text-xl flex items-center justify-center">Admin Name</p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Branch Name"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between p-2">
          <p className="text-xl flex items-center justify-center">
            Admin Password
          </p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Branch Name"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between  p-2">
          <p className="text-xl flex items-center justify-center">
            Admin Number
          </p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Branch Name"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between  p-2">
          <p className="text-xl flex items-center justify-center">Role</p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Role"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between p-2">
          <p className="text-xl flex items-center justify-center">Email</p>
          <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-[400px]">
            <input
              className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
              type="text"
              placeholder="Enter Admin Email"
            />
          </div>
        </div>
        <div className="flex  w-11/12 justify-between p-2">
          <p></p>
          <div className="flex bg-black h-11 rounded-xl w-[80px] items-center justify-center text-white text-lg">
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
