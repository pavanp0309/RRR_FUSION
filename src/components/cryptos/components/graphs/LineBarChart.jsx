import React from 'react'
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
  } from 'recharts';

const LineBarChart = ({data}) => {
  console.log("Bar chart data:",data)

  //creating the data for chart
  let formatedData=data?.map((item)=>(
    {
      date:new Date(item?.timestamp*1000).toLocaleString(),
      price:parseFloat(item?.price*2.0)
    }

  )).slice(0,20) || []
  return (
    <div style={{ width: '100%', height: "300px" }}>
    <ResponsiveContainer width="100%" height="100%">
    <ComposedChart
      width={500}
      height={400}
      data={formatedData}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      {/*<CartesianGrid stroke="#f5f5f5" />*/}
      {/*<XAxis dataKey="date" scale="band" />*/}
      {/*<YAxis />*/}
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="price" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="price" barSize={50} fill="#413ea0" />
      <Line type="monotone" dataKey="price" stroke="#ff7300" />
      <Scatter dataKey="price" fill="red" />
    </ComposedChart>
  </ResponsiveContainer>
  </div>
  )
}

export default LineBarChart
