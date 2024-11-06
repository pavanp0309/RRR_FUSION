import {useGetGeneralNewsQuery} from '../services/generalNewsApi'

const useGeneralNews = (category='general') => {
    let{data,isLoading,isError}=useGetGeneralNewsQuery({category})
    console.log("newsData:",data)
    let news=data?.articles || []
  return {news,isLoading,isError}
}

export default useGeneralNews
