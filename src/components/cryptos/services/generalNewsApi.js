import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



// apiKey 
let apiKey='3c37bca7f708b38779f3b843815a4429'

// Define a service using a base URL and expected endpoints
let  baseUrl=`https://gnews.io/api/v4/top-headlines`

// helper function to combine the Api headers and api baseUrl to get the Results
const createRequest=(url)=>({url})


export const generalNewsApi = createApi({
  reducerPath: 'generalNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getGeneralNews: builder.query({
        query: ({category,lan_symbol}) =>
          createRequest(`?category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`)
      })
      
    }),
  })
  

  // Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetGeneralNewsQuery}=generalNewsApi;