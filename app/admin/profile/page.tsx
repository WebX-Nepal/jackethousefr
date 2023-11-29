"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Profile() {
  const userDetails = useSelector((state: any) => state.auth?.userDetail);
  const [changePasswordClicked, setchangePasswordClicked] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: any) => {
    console.log("submitted data are", data);
  };

  useEffect(() => {
    setValue("name", userDetails?.name);
    setValue("email", userDetails?.email);
  }, [userDetails]);

  const togglePasswordVisibility = (passwordType: string) => {
    switch (passwordType) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  return (
    <div className="h-full bg-primary m-4 z-10 shadow-lg p-4 pt-8">
      <div className="flex p-4">
        <div>
          <div className="w-[200px] h-[200px] bg-red-300 rounded-full flex items-center justify-center">
            <img
              src={"/pic9.jfif"}
              alt="User"
              style={{ borderRadius: "50%", height: "200px", width: "200px" }}
            />
          </div>
          <button className="flex justify-center items-center w-11/12 ml-2 py-2 bg-black mt-2 rounded-2xl text-white ">
            Update Image
          </button>
        </div>
        <div className="ml-20 mt-8">
          <p className="text-3xl">{userDetails.name}</p>
          <p className="text-2xl pt-1">{userDetails.phone}</p>
          <p className="text-2xl text-blue-600 pt-1">{userDetails.email}</p>
        </div>
      </div>
      <p className="px-6 text-xl font-bold pt-6">Account</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="2xl:grid 2xl:grid-cols-1 pl-4 pr-4 pt-4 mb-0">
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
                    placeholder="Enter Admin Name"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">Email</p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Admin Email"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {changePasswordClicked && (
            <>
              <div className="flex  w-11/12 justify-between p-2">
                <p className="text-xl flex items-center justify-center">
                  Current Password
                </p>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                  <Controller
                    name="currentPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter Current Password"
                        {...field}
                      />
                    )}
                  />
                  <button onClick={() => togglePasswordVisibility("current")}>
                    {showCurrentPassword ? (
                      <AiFillEye className="text-xl hover:cursor-pointer" />
                    ) : (
                      <AiFillEyeInvisible className="text-xl hover:cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex  w-11/12 justify-between p-2">
                <p className="text-xl flex items-center justify-center">
                  New Password
                </p>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        {...field}
                      />
                    )}
                  />
                  <button onClick={() => togglePasswordVisibility("new")}>
                    {showNewPassword ? (
                      <AiFillEye className="text-xl hover:cursor-pointer" />
                    ) : (
                      <AiFillEyeInvisible className="text-xl hover:cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex  w-11/12 justify-between p-2">
                <p className="text-xl flex items-center justify-center">
                  Confirm Password
                </p>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        {...field}
                      />
                    )}
                  />
                  <button onClick={() => togglePasswordVisibility("confirm")}>
                    {showConfirmPassword ? (
                      <AiFillEye className="text-xl hover:cursor-pointer" />
                    ) : (
                      <AiFillEyeInvisible className="text-xl hover:cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          className={`${
            changePasswordClicked
              ? "hidden"
              : "px-6 ml-5 bg-black text-white py-2 rounded-2xl shadow-xl shadow-slate-100"
          }`}
          onClick={() => {
            setchangePasswordClicked(!changePasswordClicked);
          }}
        >
          Change Password
        </button>
        <div className="w-11/12 pr-6 flex justify-end pt-2 mt-0 ">
          <div className="flex bg-black h-11 rounded-xl w-[80px] items-center justify-center text-white text-lg">
            <button>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
