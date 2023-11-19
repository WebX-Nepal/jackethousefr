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
    getLocalProductsByBranch: builder.query<any, any>({
      query: ({ category, productName }) => ({
        url: `/localProducts/getLocalProduct?productName=${productName}&category=${
          category == "All" ? "" : category
        }`,
      }),
    }),
    getProductById: builder.query<any, any>({
      query: (ID) => ({
        url: `/product/${ID}`,
      }),
    }),
    deleteProductById: builder.query<any, any>({
      query: (deleteProductId) => ({
        url: `/product/${deleteProductId}`,
        method: "DELETE",
      }),
    }),
    updateProductById: builder.mutation<any, any>({
      query: ([formData, ID]) => ({
        url: `/product/${ID}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    getCategory: builder.query<any, any>({
      query: () => ({
        url: `/product/getCategory/`,
      }),
    }),
    getLatestProduct: builder.query<any, any>({
      query: (data) => ({
        url: `/product/getLatestproducts/${data}`,
      }),
    }),
    recordLocalProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: `/localProducts/createLocalProduct`,
        method: "POST",
        body: data,
      }),
    }),
    getDeliveredProducts: builder.query<any, any>({
      query: () => ({
        url: `/product/getDeliveredProducts/`,
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
    createBranch: builder.mutation<any, any>({
      query: (data) => ({
        url: `/branch/registerBranch`,
        method: "POST",
        body: data,
      }),
    }),
    getBranch: builder.query<any, any>({
      query: () => ({
        url: `/branch/getBranch`,
      }),
    }),
    createSales: builder.mutation<any, any>({
      query: (data) => ({
        url: `/sales/createSales`,
        method: "POST",
        body: data,
      }),
    }),
    createCategory: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/registerCategory`,
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
  useDeleteProductByIdQuery,
  useGetLocalProductsByBranchQuery,
  useCreateCategoryMutation,
  useUpdateProductByIdMutation,
  useGetDeliveredProductsQuery,
  useGetBranchQuery,
  useRecordLocalProductMutation,
  useGetCategoryQuery,
  useCreateBranchMutation,
  useGetLatestProductQuery,
  useGetMemberSalesHistoryQuery,
  useGetMemberByIDQuery,
  useCreateSalesMutation,
  useGetSalesReportsProductsDataQuery,
  useGetSalesDataQuery,
  useGetAllMembersQuery,
  useDownloadReportsQuery,
} = secureApi;
