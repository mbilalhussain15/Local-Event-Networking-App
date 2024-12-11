import { apiSlice } from "../apiSlice";

const TICKET_URL = "/tickets";

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Event-related API endpoints
    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: `${TICKET_URL}/createTicket`,
        method: "POST",
        body: ticketData,
        credentials: "include",
      }),
    }),

  }),
});

export const {
  useCreateTicketMutation
} = ticketApiSlice;
