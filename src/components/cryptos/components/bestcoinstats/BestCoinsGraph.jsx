import React from 'react'
import { Card } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useCryptoHistory from '../../hooks/useCryptoHistory'
import { curveCardinal } from 'd3-shape';
import "./bestcoinstyle.css";

const cardinal = curveCardinal.tension(0.2);

const BestCoinsGraph = ({coins}) => {
  //console.log("graphcoins",coins)
  let {uuid:coinId,iconUrl,symbol}=coins
  //console.log("graphcoinsid",coinId)
  let{history,isLoading,isError}=useCryptoHistory(coinId)
  console.log("BestCoinshisory",history)
  

  //generating the data for Graph

  let histories=history.map(point=>(
    {
    date:new Date(point.timestamp*1000).toLocaleDateString(),
    price:point.price
    }
  ));
  //for color generating on the graph

  let lastpoint=histories[histories.length-1]?.price
  let firstPoint=histories[0]?.price;
  let color=lastpoint>=firstPoint?"orange":"#3498db"
  let strokecolor=lastpoint>=firstPoint?"green":"red"
  console.log(lastpoint)
  return (
   <Card
   id='bestCoins'
   title={
    <div style={{display:"flex",justifyContent:"start"}}>
      <img src={iconUrl}alt={symbol}style={{width:"30px",marginRight:"10px"}}/>
      <span>{symbol}</span>
    </div>
   }
   border={false}
   hoverable
   loading={isLoading}
   style={{width:"350px",height:"250px"}}
   >

<ResponsiveContainer height={170}>
        <AreaChart
          width={500}
          height={400}
          data={histories}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          {/*<XAxis dataKey="date" />}*/}
          {/*<YAxis />*/}
          {/*<Tooltip />*/}
          <Area type="monotone" dataKey="price" stroke={strokecolor} fill={color} fillOpacity={0.3}  />
          <Area type={cardinal} dataKey="price" stroke={strokecolor} fill={color} fillOpacity={0.3}/>
        </AreaChart>
      </ResponsiveContainer>

   </Card>
  )
}

export default BestCoinsGraph
