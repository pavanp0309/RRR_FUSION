import React from 'react'
import { Card} from 'antd';
import "./bestcoinstyle.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useCryptoHistory from '../../hooks/useCryptoHistory'
import { curveCardinal } from 'd3-shape';
const cardinal = curveCardinal.tension(0.2);

const BestCoinsGraph = ({coins}) => {
  console.log("graphcoins:",coins)
  let {uuid:coinId,iconUrl,symbol,name}=coins
  console.log("graphcoinsIds",coinId)
  let {history,isLoading,isError}=useCryptoHistory(coinId)
  console.log("BestCoinshistory:",history)


  // generating the data for Graph
  let histories=history.map(point=>(
    {
      date:new Date(point.timestamp*1000).toLocaleDateString(),
      price:point.price
    }
  ));

  // for color generating on the Graph

  let lastpoint=histories[histories.length-1]?.price;
  let firstPoint=histories[0]?.price;
  let color=lastpoint>=firstPoint?"orange":"#3498db"
  let storkecolor=lastpoint>=firstPoint?"#2ecc71":"#e74c3c"

  console.log(histories.date)

  return (
    <Card 
    id='bestCoins'
    title={
      <div style={{display:"flex",justifyContent:"start"}}>
        <img src={iconUrl} alt={symbol} style={{width:"30px",marginRight:'10px'}} />
        <span>{symbol}</span>
      </div>
    }
    bordered={false}
    hoverable
    loading={isLoading}
    style={{ maxWidth: "100%", width: "100%", height: "280px" }}
    >
     <ResponsiveContainer height={200} width="100%" >
        <AreaChart
          
          data={histories}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="date" />
          <YAxis /> */}
          {/* <Tooltip /> */}
          <Area type="monotone" dataKey="price" stroke={storkecolor} fill={color} fillOpacity={0.3}  />
          <Area type={cardinal} dataKey="price" stroke={storkecolor} fill={color} fillOpacity={0.3}  />
        </AreaChart>
      </ResponsiveContainer>



  </Card>
  )
}

export default BestCoinsGraph
