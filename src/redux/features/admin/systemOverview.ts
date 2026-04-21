import { baseAPI } from "../../api/baseApi";


export const dashboardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
  
  getSystemOverview: build.query({
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
              totalRevenue
              byCurrency {
                currency
                amount
              }
              activeSubscriptions
              totalPayments
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
    return response?.data?.getSystemOverview ?? response?.data ?? response;
  },
  providesTags: ["Overview"],
}),
  }),
});

export const { useGetSystemOverviewQuery } = dashboardApi;