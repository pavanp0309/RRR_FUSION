import React from 'react'
import { useGetcryptoStatsQuery } from '../../services/cryptoMarketsApi'

const useCryptoMarkets = () => {

    let {data,isLoading,isError}=useGetcryptoStatsQuery()
    let coins=data?.data?.coins || {}
    console.log(coins)

  return {coins}
    
}

export default useCryptoMarkets
