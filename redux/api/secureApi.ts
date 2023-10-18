// use this api when token is required
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const secureApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createProducts: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/registerProduct`,
        method: "POST",
        body: data,
      }),
    }),
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
    getLatestProduct: builder.query<any, any>({
      query: () => ({
        url: `/product/getLatestproducts/`,
      }),
    }),
    getMemberByID: builder.query<any, any>({
      query: (ID) => ({
        url: `/member/searchMemberByNumber/?phone=${ID}`,
      }),
    }),

    getMemberSalesHistory: builder.query<any, any>({
      query: (ID) => ({
        url: `/member/salesHistory/${ID}`,
      }),
    }),

    createSales: builder.mutation<any, any>({
      query: (data) => ({
        url: `/sales/createSales`,
        method: "POST",
        body: data,
      }),
    }),
    getSalesReportsProductsData: builder.query<any, any>({
      query: () => ({
        url: `sales/getSalesReportsDataProducts`,
      }),
    }),
    getSalesData: builder.query<any, any>({
      query: () => ({
        url: "/sales/getSales",
      }),
    }),
    getAllMembers: builder.query<any, any>({
      query: () => ({
        url: "/member/getAllMember",
      }),
    }),

    downloadReports: builder.query<any, any>({
      query: () => ({
        url: "report/createPDFReport",
      }),
    }),
  }),
});
export const {
  useCreateProductsMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetLatestProductQuery,
  useGetMemberSalesHistoryQuery,
  useGetMemberByIDQuery,
  useCreateSalesMutation,
  useGetSalesReportsProductsDataQuery,
  useGetSalesDataQuery,
  useGetAllMembersQuery,
  useDownloadReportsQuery,
} = secureApi;
