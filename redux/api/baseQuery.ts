import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { RootState } from "../store";
type RootStateWithAuth = RootState & {
  auth: {
    token: string;
  };
};
const baseQuery = fetchBaseQuery({
  baseUrl: `localhost?;nasdn/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootStateWithAuth).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Access-Control-Allow-Headers", "*");
      headers.set("Access-Control-Allow-Credentials", "true");
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error && result?.error?.originalStatus === 401) {
    localStorage.removeItem("token");
    //Router.push("/login");
  }
  if (result.error) {
    // console.log("error",error)
  }
  return result;
};
