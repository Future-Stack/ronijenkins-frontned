import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://navelle-ai-ay11.onrender.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  tagTypes: ['Analytics', 'AI'],

  endpoints: (builder) => ({

    getHealth: builder.query({
      query: () => '/health',
    }),


    getMostUsedQuestions: builder.query({
      query: () => '/analytics/most-used-questions',
      providesTags: ['Analytics'],
    }),


    getRecentQueries: builder.query({
      query: () => '/analytics/recent-queries',
      providesTags: ['Analytics'],
    }),


    sendMessageToAI: builder.mutation({
      query: (message: string) => ({
        url: '/ai/chat',
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['AI'],
    }),

  }),
})

// hooks export
export const {
  useGetHealthQuery,
  useGetMostUsedQuestionsQuery,
  useGetRecentQueriesQuery,
  useSendMessageToAIMutation,
} = api