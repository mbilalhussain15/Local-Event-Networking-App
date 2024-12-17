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

    getTicketsByUserId: builder.query({
      query: (userId) => ({
        url: `${TICKET_URL}/getTicketsByUserId/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  
  }),
});

    

export const {
  useCreateTicketMutation,
  useGetTicketsByUserIdQuery,
} = ticketApiSlice;
