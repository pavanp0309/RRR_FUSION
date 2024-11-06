import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//apikey
let apiKey=import.meta.env.VITE_GENERAL_NEWS_API_KEY;

// Define a service using a base URL and expected endpoints
let baseUrl=`https://gnews.io/api/v4/top-headlines`



//Helper function to combine the api headers and api base url to get the results

const createRequest=(url)=>({url})


// Function for fetchinh the api
export const generalNewsApi = createApi({
    reducerPath: 'generalNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getGeneralNews: builder.query({
        query: ({category,lan_symbol})=>createRequest(`?category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`)
      }),
     
      }),
    
      })


 // Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetGeneralNewsQuery}=generalNewsApi;
    
   
