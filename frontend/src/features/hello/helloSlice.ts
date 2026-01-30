import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, HelloWorld } from '../../types/api';

export const helloSlice = createApi({
  reducerPath: 'helloApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getHello: builder.query<ApiResponse<HelloWorld>, void>({
      query: () => '/hello',
    }),
    getHelloCustom: builder.query<ApiResponse<HelloWorld>, string>({
      query: (message) => `/hello/${encodeURIComponent(message)}`,
    }),
  }),
});

export const { useGetHelloQuery, useGetHelloCustomQuery } = helloSlice;
