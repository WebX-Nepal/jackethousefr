"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetBranchDetailsQuery,
  useUpdateProfilePictureMutation,
} from "@/redux/api/secureApi";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { MdDone } from "react-icons/md";
import LoadingScreen from "@/components/LoadingScreen";
import { toast } from "react-toastify";

function Profile() {
  const [files, setFiles] = useState<any>([]);
  const [branchDetails, setBranchDetails] = useState<any>([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const userDetails = useSelector((state: any) => state.auth?.userDetail);
  const [
    updateProfilePicture,
    { isSuccess: isProfileUpdateSuccess, isLoading: isProfileUpdateLoading },
  ] = useUpdateProfilePictureMutation();
  const { data, isSuccess } = useGetBranchDetailsQuery({});
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
      branchName: "",
      branchAddress: "",
      adminNumber: "",
      adminEmail: "",
      adminPassword: "",
    },
    // resolver: yupResolver(validationSchema),
  });
  const onSubmit = () => {
    console.log("here");
  };
  const handleProfileChange = async () => {
    if (files.length > 0) {
      setProfileLoading(true);
      const formData = new FormData();
      formData.append("profileImage", files[0]?.file);
      await updateProfilePicture(formData);
    }
  };
  useEffect(() => {
    if (data && isSuccess) {
      setBranchDetails(data?.data);
      setValue("branchName", data?.data?.branchName);
      setValue("branchAddress", data?.data?.address);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isProfileUpdateSuccess) {
      toast.success("Successfully Updated Image");
      setFiles([]);
      setProfileLoading(false);
    }
  }, [isProfileUpdateSuccess]);
  useEffect(() => {
    if (data && isSuccess) {
      setValue("name", userDetails?.name);
      setValue("adminNumber", userDetails?.phone);
      setValue("adminEmail", userDetails?.email);
    }
  }, [isSuccess]);

  return (
    <div className="h-full bg-primary m-4 z-10 shadow-lg p-4 pt-8 mt-11">
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
                  src={userDetails?.profileImage}
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
            </div>{" "}
            <div className="ml-20 mt-8">
              <p className="text-2xl pt-1">{branchDetails?.branchName}</p>
              <p className="text-2xl pt-1"> {branchDetails?.address}</p>
              <p className="text-3xl text-blue-600">{userDetails.name}</p>
              <p className="text-2xl pt-1">{userDetails.phone}</p>
            </div>
          </div>
          <p className="px-6 text-xl font-bold pt-6">Account</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="2xl:grid 2xl:grid-cols-2 pl-4 pr-4 pt-4 mb-0">
              <div className="flex  w-11/12 justify-between p-2">
                <p className="text-xl flex items-center justify-center">
                  Branch Name
                </p>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white  w-2/3">
                  <Controller
                    name="branchName"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                        type="text"
                        placeholder="Enter Branch Name"
                        {...field}
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
                    name="branchAddress"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                        type="text"
                        placeholder="Enter Branch Address"
                        {...field}
                        disabled
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
                        placeholder="Enter Admin Name"
                        disabled
                        {...field}
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
                    name="adminNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                        type="text"
                        placeholder="Enter admin number"
                        disabled
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              {/* <div className="flex  w-11/12 justify-between p-2">
            <p className="text-xl flex items-center justify-center">
              Admin Password
            </p>
            <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
              <Controller
                name="adminPassword"
                control={control}
                render={({ field }) => (
                  <input
                    className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                    type="text"
                    placeholder="Enter Admin Password"
                    disabled
                    {...field}
                  />
                )}
              />
            </div>
          </div> */}
              <div className="flex  w-11/12 justify-between p-2">
                <p className="text-xl flex items-center justify-center">
                  Email
                </p>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between bg-white w-2/3">
                  <Controller
                    name="adminEmail"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="outline-none placeholder-gray-500 bg-white text-black flex  flex-grow "
                        type="text"
                        placeholder="Enter Admin Email"
                        disabled
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            {/* <div className="w-full flex justify-end pr-20 xl:pr-20 pt-2 mt-0 ">
          <div className="flex bg-black h-11 rounded-xl w-[80px] items-center justify-center text-white text-lg">
            <button>Save</button>
          </div>
        </div> */}
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
