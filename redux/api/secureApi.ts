// use this api when token is required
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const secureApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, any>({
      query: ({ category, productName }) => ({
        url: `/product/getProducts?productName=${productName}&category=${
          category == "All" ? "" : category
        }`,
      }),
    }),
    getProductById: builder.query<any, any>({
      query: (ID) => ({
        url: `/product/${ID}`,
      }),
    }),
    createProducts: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/registerProduct`,
        method: "POST",
        body: data,
      }),
    }),
    getMemberByID: builder.query<any, any>({
      query: (ID) => ({
        url: `/member/searchMemberByNumber/${ID}`,
      }),
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductsMutation,
  useGetMemberByIDQuery,
} = secureApi;
