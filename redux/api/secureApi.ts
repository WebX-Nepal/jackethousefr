// use this api when token is required
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
export const secureApi = createApi({
  reducerPath: "user",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    updateSuperAdmin: builder.mutation<any, any>({
      query: (data) => ({
        url: `/updateSuperAdmin`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateProfilePicture: builder.mutation<any, any>({
      query: (data) => ({
        url: `/updateProfilePicture`,
        method: "PATCH",
        body: data,
      }),
    }),
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

    //super admin ->
    getLocalProductsByBranchAdmin: builder.query<any, any>({
      query: (ID) => ({
        url: `/localProducts/getLocalProductByBranch/${ID}`,
      }),
    }),

    getBranchDetails: builder.query<any, any>({
      query: () => ({
        url: `/branch/getBranchDetails/`,
      }),
    }),
    getBranchDetailsForAdmin: builder.query<any, any>({
      query: (ID) => ({
        url: `/branch/getBranchDetailsForAdmin/${ID}`,
      }),
    }),
    getBranchSalesDetails: builder.query<any, any>({
      query: (ID) => ({
        url: `/sales/generateTotalDataOfBranch/${ID}`,
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
    deleteCategoryById: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/deleteCategoryByID`,
        method: "POST",
        body: data,
      }),
    }),
    getLocalProductsByBranch: builder.query<any, any>({
      query: ({ category, productName }) => ({
        url: `/localProducts/getLocalProduct?productName=${productName}&category=${
          category == "All" ? "" : category
        }`,
      }),
    }),

    getLatestProduct: builder.query<any, any>({
      query: ({ sortBy, search }) => ({
        url: `/product/getLatestproducts?sortOrder=${sortBy}&productName=${search}`,
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
    getBranchSalesReports: builder.query<any, any>({
      query: (ID) => ({
        url: `sales/getBranchSalesReports/${ID}`,
      }),
    }),

    generateLatestSalesDataForAdmin: builder.query<any, any>({
      query: () => ({
        url: `sales/generateLatestSalesDataForAdmin`,
      }),
    }),
    getTotalSalesDataOfAllBranches: builder.query<any, any>({
      query: () => ({
        url: `sales/generateTotalDataOfAllBranches`,
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
    downloadReportsForSuperAdmin: builder.query<any, any>({
      query: () => ({
        url: "report/createReportForSuperAdmin",
      }),
    }),
    downloadBranchReportsForSuperAdmin: builder.query<any, any>({
      query: (ID) => ({
        url: `report/createBranchReportForAdmin/${ID}`,
      }),
    }),
  }),
});
export const {
  useUpdateSuperAdminMutation,
  useUpdateProfilePictureMutation,
  useCreateProductsMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteCategoryByIdMutation,
  useGetBranchSalesDetailsQuery,
  useDeleteProductByIdQuery,
  useGetBranchDetailsForAdminQuery,
  useGetBranchDetailsQuery,
  useGetLocalProductsByBranchQuery,
  useCreateCategoryMutation,
  useUpdateProductByIdMutation,
  useGetDeliveredProductsQuery,
  useGetBranchQuery,
  useGetLocalProductsByBranchAdminQuery,
  useRecordLocalProductMutation,
  useGetCategoryQuery,
  useCreateBranchMutation,
  useGetLatestProductQuery,
  useGetMemberSalesHistoryQuery,
  useGetBranchSalesReportsQuery,
  useGetMemberByIDQuery,
  useCreateSalesMutation,
  useGetSalesReportsProductsDataQuery,
  useGetSalesDataQuery,
  useGetAllMembersQuery,
  useDownloadReportsQuery,
  useDownloadReportsForSuperAdminQuery,
  useGenerateLatestSalesDataForAdminQuery,
  useGetTotalSalesDataOfAllBranchesQuery,
  useDownloadBranchReportsForSuperAdminQuery,
} = secureApi;
