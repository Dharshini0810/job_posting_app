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
    applyForJob: builder.mutation({
      query: ({ userId, jobId }) => ({
        url: `/jobs/${jobId}/apply`,
        method: 'POST',
        body: { userId },
      }),
      async onQueryStarted({ userId, jobId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update user profile with applied job
          dispatch(
            apiSlice.util.updateQueryData('getUserProfiles', undefined, (draft) => {
              const userProfile = draft.find((profile) => profile.id === userId);
              if (userProfile && !userProfile.appliedJobs.includes(jobId)) {
                userProfile.appliedJobs.push(jobId);
              }
            })
          );

          // Update company profile with applied user
          dispatch(
            apiSlice.util.updateQueryData('getCompanyProfiles', undefined, (draft) => {
              const companyProfile = draft.find((profile) =>
                profile.jobs.some((job) => job.jobId === jobId)
              );
              if (companyProfile) {
                const job = companyProfile.jobs.find((job) => job.jobId === jobId);
                if (job && !job.users.includes(userId)) {
                  job.users.push(userId);
                }
              }
            })
          );

        } catch (err) {
          console.error('Failed to apply for job:', err);
        }
      },
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
