import { baseAPI } from "../../api/baseApi";


// Backend Enums (Erasable Syntax Safe)
export const BroadcastType = {
  NOW: 'NOW',
  SCHEDULED: 'SCHEDULED',
} as const;

export type BroadcastType = (typeof BroadcastType)[keyof typeof BroadcastType];

export const BroadcastMethod = {
  FCM: 'FCM',
  EMAIL: 'EMAIL',
  SMS: 'SMS',
} as const;

export type BroadcastMethod = (typeof BroadcastMethod)[keyof typeof BroadcastMethod];

export const broadcastApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // Create Broadcast Mutation
    createBroadcast: build.mutation({
      query: ({ file, input }) => {
        const formData = new FormData();

        // ১. Operations: কুয়েরি এবং ভ্যারিয়েবল সেট করা
        const operations = {
          query: `
            mutation createBroadcast($file: Upload!, $input: CreateBroadcastInput!) {
              createBroadcast(file: $file, input: $input) {
                id
                name
                body
                buttonText
                linkUrl
                attachmentUrl
                scheduledAt
                type
                status
                method
                createdAt
              }
            }
          `,
          variables: {
            file: null, // এটি ম্যাপ দ্বারা রিপ্লেস হবে
            input: {
              name: input.name,
              body: input.body,
              buttonText: input.buttonText,
              linkUrl: input.linkUrl || null,
              scheduledAt: input.scheduledAt || null,
              type: input.type,
              method: input.method,
            },
          },
        };

        formData.append("operations", JSON.stringify(operations));


        const map = {
          "0": ["variables.file"],
        };
        formData.append("map", JSON.stringify(map));

        if (file) {
          formData.append("0", file);
        }

        return {
          url: "",
          method: "POST",
          body: formData,
       
        };
      },
      invalidatesTags: ["Broadcast"],
    }),


    getBroadcasts: build.query({
      query: () => ({
        body: {
          query: `
            query getBroadcasts {
              getBroadcasts {
                id
                name
                status
                type
                createdAt
              }
            }
          `,
        },
      }),
      providesTags: ["Broadcast"],
    }),


  }),
});

export const { useCreateBroadcastMutation, useGetBroadcastsQuery,  } = broadcastApi;