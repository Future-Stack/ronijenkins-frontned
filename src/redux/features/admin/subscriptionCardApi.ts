import { baseAPI } from "../../api/baseApi";

export const subscriptionCardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionCard: build.query<any, void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query getSystemOverview {
              getSystemOverview {
                users {
                  total
                  admins
                  customers
                  active
                  inactive
                }
                revenue {
                  totalRevenue {
                    current
                    previous
                    total
                    percentageChange
                  }
                  activeSubscriptions {
                    current
                    previous
                    total
                    percentageChange
                  }
                  totalPayments {
                    current
                    previous
                    total
                    percentageChange
                  }
                  conversionRate {
                    current
                    previous
                    total
                    percentageChange
                  }
                  byCurrency {
                    currency
                    amount
                    total
                    previousAmount
                    percentageChange
                  }
                }
                engagement {
                  totalContent
                  totalImpressions
                  avgContentRating
                  totalPosts
                  totalComments
                }
                health {
                  totalLogs
                  topSymptoms {
                    name
                    count
                    avgSeverity
                  }
                  overallAvgSeverity
                }
              }
            }
          `,
        },
      }),

      transformResponse: (response: any) => {
        console.log("FULL RESPONSE 👉", response);

        return response?.data?.getSystemOverview || response?.data;
      },

      providesTags: ["SystemOverview"],
    }),
  }),
});

export const { useGetSubscriptionCardQuery } = subscriptionCardApi;