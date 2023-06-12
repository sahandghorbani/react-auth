import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";

// Define the base query function
const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001" });

// Create the users API slice
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    loginUser: builder.mutation<User, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "/users",
        method: "POST",
        body: { username, password },
      }),

    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

// Export the getUsers and loginUser endpoints
export const { useGetUsersQuery, useLoginUserMutation  , useGetUserByIdQuery} = usersApi;
