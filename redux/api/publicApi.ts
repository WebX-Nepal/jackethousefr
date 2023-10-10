// use this api when token is not required
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const publicApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "localhost",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials: any) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useLoginMutation } = publicApi;
