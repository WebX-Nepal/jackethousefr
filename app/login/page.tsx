"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { setAuthState } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
type Inputs = {
  email: string;
  password: string;
};
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  };
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(setAuthState(session));
      router.push("/dashboard/reports");
    }
  }, [session]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-center text-2xl mb-5">
              Jacket House
            </h1>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between w-full mb-5">
                  <input
                    type="text"
                    className="w-full outline-none placeholder-gray-500"
                    {...register("email")}
                  />
                </div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <div className="flex items-center rounded-xl border border-gray-600 p-2 justify-between w-full mb-5">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full outline-none placeholder-gray-500 bg-transparent"
                    {...register("password", { required: true })}
                  />
                  {showPassword ? (
                    <AiFillEye
                      className="text-xl hover:cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className="text-xl hover:cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  ></svg>
                </button>
              </div>

              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block align-text-top"
                      ></svg>
                      <span className="inline-block ml-1">Forgot Password</span>
                    </button>
                  </div>
                  <div className="text-center sm:text-right whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block align-text-bottom	"
                      ></svg>
                      <span className="inline-block ml-1">Help</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
