 import { useGetcryptoStatsQuery,useGetcryptoMarketsQuery } from '../services/cryptoMarketsApi'

const useCryptoMarkets = () => {

    let {data,isLoading,isError}=useGetcryptoMarketsQuery()
    //optional chaining
    let coins=data?.data?.coins || []
    const globalStats=data?.data?.stats;
    console.log('customcoin:',coins)
    console.log('globalstats:',globalStats)

  return {coins,globalStats,isError,isLoading}
    
}

export default useCryptoMarkets
