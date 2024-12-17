import { apiSlice } from "../apiSlice";

const EVENT_URL = "/event";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Event-related API endpoints
    createEvent: builder.mutation({
      query: (formData) => ({
        url: `${EVENT_URL}/createEvent`,
        method: "POST",
        body: formData,
        credentials: "include",
        
      }),
    }),
    uploadEventImage: builder.mutation({
      query: ({user_Id, eventId, formData }) => ({
        url: `${EVENT_URL}/uploadEventImage/${user_Id}/${eventId}`,  // Use eventId in the URL
        method: 'POST',
        body: formData,  // Send FormData containing the image
        credentials: 'include',
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }),
    }),
    
    getEvents: builder.query({
      query: () => ({
        url: `${EVENT_URL}/getEvents`,
        method: "GET",
        credentials: "include",
        // Disable caching in RTK Query
        headers: {
          'Cache-Control': 'no-cache',
        },
      }),
      // Optionally, disable caching in RTK query (this will re-fetch data every time)
      provideTags: ['EventList'],
      keepUnusedDataFor: 0, // This will prevent data from being cached
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
  useUploadEventImageMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventByIdMutation,
  useUpdateEventLocationMutation,
} = eventApiSlice;
