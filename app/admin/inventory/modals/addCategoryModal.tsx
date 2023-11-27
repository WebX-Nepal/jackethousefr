"use client";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../../components/LoadingScreen";
import { toast } from "react-toastify";
import CustomScrollbar from "../../../../components/ScrollBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { FilePond } from "react-filepond";
import { useCreateCategoryMutation } from "@/redux/api/secureApi";
const AddCategoryModal = ({
  isOpen,
  closeModal,
  categoryData,
  refetch,
}: any) => {
  console.log("Categ roy data is", categoryData);
  const [isDataSending, setIsdataSending] = useState<boolean>(false);
  const [files, setFiles] = useState<any>();
  const [
    sendData,
    { isSuccess: isSendDataSuccess, isLoading: isDataSendingLoading },
  ] = useCreateCategoryMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsdataSending(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("categoryImage", files[0]?.file);
    await sendData(formData);
    reset();
  };
  useEffect(() => {
    if (isSendDataSuccess) {
      closeModal();
      setFiles(null);
      toast.success("Successfully Created Category");
      refetch();
    } else {
    }
  }, [isSendDataSuccess]);
  useEffect(() => {
    if (isDataSendingLoading) {
      setIsdataSending(true);
    } else {
      setIsdataSending(false);
    }
  }, [isDataSendingLoading]);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (isOpen && e.target.classList.contains("modal-container")) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);
  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 modal-container ${
        isOpen ? "" : "hidden"
      }`}
    >
      <>
        <section className="w-1/2 h-2/3 p-6 mx-autorounded-md shadow-2xl bg-modalBackground  mt-20 z-50 rounded-xl">
          <h1 className="text-xl font-bold text-Black capitalize pb-4">
            Add New Category
          </h1>
          {isDataSending ? (
            <>
              <LoadingScreen message="Sending Data. Please Wait...." />
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                {categoryData.length > 0 && (
                  <CustomScrollbar scrollHeight={190}>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="">
                        <tr>
                          <th className="px-6 text-left text-md font-semibold text-black  tracking-wider">
                            SN
                          </th>
                          <th className="px-6 text-left text-md font-semibold text-black  tracking-wider">
                            Name
                          </th>
                          <th className="px-6  text-left text-md font-semibold text-black  tracking-wider">
                            Image
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {categoryData.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td className="px-6 py-2 whitespace-nowrap mt-2">
                                {index + 1}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap">
                                {item?.name}
                              </td>
                              <td className="px-6  whitespace-nowrap">
                                <img
                                  src={item?.categoryImage}
                                  height={70}
                                  width={70}
                                  alt="image"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </CustomScrollbar>
                )}
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    Name:
                    <div className="border rounded-xl border-gray-600  flex items-center justify-center">
                      <input
                        id="name"
                        type="text"
                        placeholder="Please Enter Name"
                        className="w-full h-full p-3 outline-none placeholder-gray-500 bg-white text-black rounded-xl"
                        {...register("name")}
                      />
                    </div>
                    {/* <p className="text-red-600">{errors.name?.message}</p> */}
                  </div>
                  <div className="w-full">
                    <FilePond
                      files={files}
                      allowMultiple={false}
                      allowRevert
                      allowDrop
                      onupdatefiles={setFiles}
                      styleButtonRemoveItemPosition="left"
                      labelIdle={`Drag & Drop your <span class="filepond--label-action">Image</span> Files`}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-transparant border-white border rounded-2xl shadow-md shadow-buttonShadow  focus:outline-none focus:bg-gray-600 focus:text-white"
                    onClick={handleSubmit(onSubmit)}
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </>
    </div>
  );
};

export default AddCategoryModal;
