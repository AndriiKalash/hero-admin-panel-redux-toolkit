import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: (page) => `/heroes?_page=${page}&_limit=3`,
      providesTags: ["Heroes"],
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero,
      }),
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
    addTask: builder.mutation({
      query: ({ heroId, task }) => ({
        url: `/heroes/${heroId}`,
        method: "PATCH",
        body: { task },
      }),
      invalidatesTags: ["Heroes"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useAddTaskMutation,
} = apiSlice;
