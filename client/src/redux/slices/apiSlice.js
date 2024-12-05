import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URI = 'http://10.0.2.2:4000'; // Replace with your actual API URL

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI + '/api',
  credentials: 'include',
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({}),
});

export default apiSlice;
