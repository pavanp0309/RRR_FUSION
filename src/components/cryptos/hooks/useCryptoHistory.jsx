import { useGetcryptoHistoryQuery } from "../services/cryptoMarketsApi"

const useCryptoHistory = (coinId,timePeriod="3m") => {

    let {data,isError,isLoading}=useGetcryptoHistoryQuery({coinId,timePeriod})
    let history=data?.data?.history || []

  return {history,isError,isLoading}
}

export default useCryptoHistory
