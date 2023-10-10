// use this api when token is required
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
export const secureApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllRegions: builder.query<any, any>({
      query: () => "region/getAll",
    }),
    createUser: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "user/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetAllRegionsQuery } = secureApi;
