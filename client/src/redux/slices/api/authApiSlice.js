import { apiSlice } from "../apiSlice";

const USER_URL = "/users";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/getUsers`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/getUserById/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_URL}/updateUser/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/deleteUserById/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserByIdMutation,
} = authApiSlice;