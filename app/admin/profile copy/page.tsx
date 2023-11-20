"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

function Profile() {
  const userDetails = useSelector((state: any) => state.auth?.userDetail);
  console.log("user details is", userDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      costPrice: 0,
      sellingPrice: 0,
      color: "",
      category: "",
      discount: 0,
      size: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  const onSubmit = () => {
    console.log("here");
  };
  useEffect(() => {
    // setValue("name", selectedRowData?.name);
    // setValue("category", selectedRowData?.category?.name);
    // setValue("costPrice", selectedRowData?.costPrice);
    // setValue("sellingPrice", selectedRowData?.sellingPrice);
    // setValue("color", selectedRowData?.color);
    // setValue("discount", selectedRowData?.discount);
    // setValue("size", selectedRowData?.size);
  }, [userDetails]);
  return (
    <div className="h-full bg-primary m-4 z-10 shadow-lg p-4 pt-8">
      <div className="flex p-4">
        <div className="w-[200px] h-[200px] bg-red-300 rounded-full ">
          image
        </div>
        <div className="ml-20 mt-8">
          <p className="text-3xl">{userDetails.name}</p>
          <p className="text-2xl pt-1">{userDetails.phone}</p>
          <p className="text-2xl text-blue-600 pt-1">Branch Name</p>
          <p className="text-2xl pt-1">Branch Location</p>
        </div>
      </div>
      <p className="px-6 text-xl font-bold pt-6">Account</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="2xl:grid 2xl:grid-cols-2 pl-4 pr-4 pt-4 mb-0">
          <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">
              Branch Name
            </p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-slate-200  w-2/3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-slate-200 text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Branch Name"
                    disabled
                  />
                )}
              />
            </div>
          </div>
          <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">
              Branch Address
            </p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Branch Address"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">
              Admin Name
            </p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Branch Name"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex  w-11/12 justify-between  p-2">
            <p className="text-xl flex items-center justify-center">
              Admin Number
            </p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Branch Name"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">
              Admin Password
            </p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-slate-200 w-2/3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-slate-200 text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Branch Name"
                    disabled
                  />
                )}
              />
            </div>
          </div>
          <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">Email</p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-slate-200 w-2/3">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-slate-200 text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Admin Email"
                    disabled
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end pr-20 xl:pr-20 pt-2 mt-0 ">
          <div className="flex bg-black h-11 rounded-xl w-[80px] items-center justify-center text-white text-lg">
            <button>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
