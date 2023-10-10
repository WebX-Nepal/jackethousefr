// use this api when token is required
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
export const secureApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, void>({
      query: () => "/product/getProducts",
    }),
  }),
});
export const { useGetAllProductsQuery } = secureApi;
