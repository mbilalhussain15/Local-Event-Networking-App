import { apiSlice } from "../apiSlice";

const PAYMENT_URL = "/payments";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    createInitiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: `${PAYMENT_URL}/initiatePayment`,
        method: "POST",
        body: paymentData,
        credentials: "include",
      }),
    }),
    createSimulatePayment: builder.mutation({
        query: (paymentDetails) => ({
          url: `${PAYMENT_URL}/simulatePayment`,
          method: "POST",
          body: paymentDetails,
          credentials: "include",
        }),
      }),
  }),
});

export const {
  useCreateInitiatePaymentMutation,
  useCreateSimulatePaymentMutation
} = paymentApiSlice;
