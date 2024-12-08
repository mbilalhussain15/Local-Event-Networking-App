import { apiSlice } from "../apiSlice";

const EVENT_URL = "/event";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Event-related API endpoints
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENT_URL}/createEvent`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getEvents: builder.query({
      query: () => ({
        url: `${EVENT_URL}/getEvents`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `${EVENT_URL}/getEventById/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `${EVENT_URL}/updateEvent/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    deleteEventById: builder.mutation({
      query: (id) => ({
        url: `${EVENT_URL}/deleteEvent/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateEventLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `${EVENT_URL}/updateEventLocation/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventByIdMutation,
  useUpdateEventLocationMutation,
} = eventApiSlice;
