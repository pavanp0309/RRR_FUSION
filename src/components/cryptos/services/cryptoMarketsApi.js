import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//crypto
let cryptoHeaders= {
    //'x-rapidapi-key': 'f78bc71ce9msh3b016f14d2a8c96p18a469jsna55cd2510e9f',
    'x-rapidapi-key':import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}



// Define a service using a base URL and expected endpoints
let baseUrl=`https://coinranking1.p.rapidapi.com`

//Helper function to combine the api headers and api base url to get the results

const createRequest=(url)=>({url,headers:cryptoHeaders})
// Function for fetchinh the api
export const cryptoMarketApi = createApi({
    reducerPath: 'cryptoMarketApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getcryptoMarkets: builder.query({
        query: () =>  createRequest('/coins'),
      }),
      getcryptoStats: builder.query({
        query: () =>  createRequest('/stats')
      }),
      getcryptoDetails:  builder.query({
        query: (coinId) =>  createRequest(`/coin/${coinId}`)
      }),
      getcryptoHistory:  builder.query({
        query: ({coinId,timePeriod="3m"}) =>  createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
      }),
    }),
  })


  // Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetcryptoMarketsQuery,useGetcryptoStatsQuery,useGetcryptoDetailsQuery,useGetcryptoHistoryQuery} = cryptoMarketApi

