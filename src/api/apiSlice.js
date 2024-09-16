import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  tagTypes: ["Jobs", "Users", "Companies", "UserProfiles", "CompanyProfiles"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Jobs"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    addUsers: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      // Invalidates the cache for the `Users` tag, so `getUsers` will refetch
      invalidatesTags: ["Users"],
    }),
    getCompanies: builder.query({
      query: () => "/companies",
      providesTags: ["Companies"],
    }),
    addCompanies: builder.mutation({
      query: (newCompany) => ({
        url: "/companies",
        method: "POST",
        body: newCompany,
      }),
      invalidatesTags: ["Companies"],
    }),
    getUserProfiles: builder.query({
      query: () => "/userProfiles",
      providesTags: ["UserProfiles"],
    }),
    addUserProfiles: builder.mutation({
      query: (newUserProfile) => ({
        url: "/userProfiles",
        method: "POST",
        body: newUserProfile,
      }),
      invalidatesTags: ["UserProfiles"],
    }),
    updateUserProfile: builder.mutation({
      query: (newUserProfile) => ({
        url: "/userProfiles",
        method: "PATCH",
        body: newUserProfile,
      }),
      invalidatesTags: ["UserProfiles"],
    }),
    getCompanyProfiles: builder.query({
      query: () => "/companyProfiles",
      providesTags: ["CompanyProfiles"],
    }),
      postJob: builder.mutation({
        query: (newJob) => ({
          url: 'jobs',
          method: 'POST',
          body: newJob,
        }),
    }),
    addCompanyProfile: builder.mutation({
      query: (newCompanyProfile) => ({
        url: "/companyProfiles",
        method: "POST",
        body: newCompanyProfile,
      }),
      invalidatesTags: ["CompanyProfiles"],
    }),
    updateCompanyProfile: builder.mutation({
      query: (newCompanyProfile) => ({
        url: `/companyProfiles/${newCompanyProfile.id}`,
        method: "PATCH",
        body: newCompanyProfile,
      }),
      invalidatesTags: ["CompanyProfiles"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetUsersQuery,
  useAddUsersMutation,
  useGetCompaniesQuery,
  useAddCompaniesMutation,
  useGetCompanyProfilesQuery,
  useGetUserProfilesQuery,
  useAddCompanyProfileMutation,
  useAddUserProfilesMutation,
  useUpdateCompanyProfileMutation,
  useUpdateUserProfileMutation,
  usePostJobMutation
} = apiSlice;
