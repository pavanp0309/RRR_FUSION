import { useGetcryptoDetailsQuery } from '../services/cryptoMarketsApi'

const useCryptoDetails = (coinId) => {
    const {data,isError,isLoading}=useGetcryptoDetailsQuery(coinId)
    let details=data?.data?.coin ||{}
    console.log("details:",details)
  return {details ,isError,isLoading}
}

export default useCryptoDetails
