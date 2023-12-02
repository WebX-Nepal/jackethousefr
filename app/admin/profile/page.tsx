"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import LoadingScreen from "@/components/LoadingScreen";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import {
  useUpdateSuperAdminMutation,
  useUpdateProfilePictureMutation,
  useGetUserProfileQuery,
} from "@/redux/api/secureApi";
import { toast } from "react-toastify";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
function Profile() {
  const { data, isSuccess: isUserProfileSuccess } = useGetUserProfileQuery({});
  const [updateSuperAdmin, { isSuccess, isLoading }] =
    useUpdateSuperAdminMutation();
  const [
    updateProfilePicture,
    { isSuccess: isProfileUpdateSuccess, isLoading: isProfileUpdateLoading },
  ] = useUpdateProfilePictureMutation();
  const [userData, setData] = useState<any>();
  const [files, setFiles] = useState<any>([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
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
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (data && isSuccess) {
      setData(data?.user);
    }
  }, [isSuccess]);
  const handleProfileChange = async () => {
    if (files.length > 0) {
      setProfileLoading(true);
      const formData = new FormData();
      formData.append("profileImage", files[0]?.file);
      await updateProfilePicture(formData);
    }
  };
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    await updateSuperAdmin(data);
  };
  useEffect(() => {
    setValue("name", userData?.name);
    setValue("email", userData?.email);
  }, [userData]);

  useEffect(() => {
    if (isProfileUpdateSuccess) {
      toast.success("Successfully Updated Image");
      setFiles([]);
      setProfileLoading(false);
    }
  }, [isProfileUpdateSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Updated");
    }
  }, [isSuccess]);
  const togglePasswordVisibility = (passwordType: string) => {
    switch (passwordType) {
      case "current":
        setShowpassword(!showpassword);
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
      {profileLoading ? (
        <div className="h-screen w-full">
          <LoadingScreen message="Updating Profile"></LoadingScreen>
        </div>
      ) : (
        <>
          <div className="flex p-4">
            <div>
              <div className="w-[200px] h-[200px] bg-red-300 rounded-full flex items-center justify-center">
                <img
                  src={userData?.profileImage}
                  alt="User"
                  style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px",
                  }}
                />
              </div>
              <div className="flex">
                <div className="w-11/12">
                  <FilePond
                    files={files}
                    allowMultiple={false}
                    allowRevert
                    allowImagePreview={false}
                    allowDrop
                    onupdatefiles={setFiles}
                    styleButtonRemoveItemPosition="left"
                    labelIdle={`Update Image`}
                  />
                </div>
                {files.length > 0 && (
                  <button className="pb-4" onClick={handleProfileChange}>
                    <MdDone className="text-3xl font-semibold " />
                  </button>
                )}
              </div>
            </div>
            <div className="ml-20 mt-8">
              <p className="text-3xl">{userData?.name}</p>
              <p className="text-2xl text-blue-600 pt-1">{userData?.email}</p>
            </div>
          </div>
          <p className="px-6 text-xl font-bold pt-6">Account</p>
          <form>
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
                <p className="text-xl flex items-center justify-center">
                  Email
                </p>
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

              <div className="flex  w-11/12 justify-between p-2">
                <p className="text-xl flex items-center justify-center">
                  Current Password
                </p>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex flex-grow"
                        type={showpassword ? "text" : "password"}
                        placeholder="Enter Current Password"
                        {...field}
                      />
                    )}
                  />
                  <button onClick={() => togglePasswordVisibility("current")}>
                    {showpassword ? (
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
            </div>
            <div className="w-11/12 pr-6 flex justify-end pt-2 mt-0 ">
              <div className="flex bg-black h-11 rounded-xl w-[80px] items-center justify-center text-white text-lg">
                <button onClick={handleSubmit(onSubmit)}>Save</button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
