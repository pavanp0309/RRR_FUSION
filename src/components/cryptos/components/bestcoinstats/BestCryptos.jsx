import React from 'react'
import { Col, Row } from 'antd';
import { useGetcryptoStatsQuery } from '../../services/cryptoMarketsApi'
import BestCoinsGraph from './BestCoinsGraph';

const BestCryptos = () => {
//   importing the cryptostats query to get top 3 bestcoins 
let {data,isError,isLoading}=useGetcryptoStatsQuery()

if(isLoading){
    return <span>loadin...</span>
}

if(isError){
    return <span>error..</span>
}


const {bestCoins=[]}=data.data;
console.log("Bc:",bestCoins)

  return (
    <Row >
        {bestCoins.map(coins=>(
        <Col className="Best-coins-row" xs={24} sm={24} md={8} lg={8} key={coins.uuid} onLoad={isLoading} style={{padding:"16px",overflowX:"hidden"}}>
            <BestCoinsGraph  coins={coins}/>
        </Col>
        ))}
    </Row>
  )
}

export default BestCryptos
