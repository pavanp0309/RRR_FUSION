import React from 'react'
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = ({data}) => {
    console.log("chartdata",data)

     const ChartData = {
      
        labels:data.map(item=>new Date(item.timestamp*1000).toLocaleTimeString()),
    
        datasets: [
          {
            label: "Price",
            data: data.map(item=>parseFloat(item.price)),
            backgroundColor: data.map(item=>{
                let price=parseFloat(item.price)
                if(price<6.3) return "rgba(255,99,132,0.2)"
                if(price>6.3) return "rgba(75,192,192,0.2)"
                return 'rgb(255,159,0.2)'
            }),
            borderColor: data.map(item=>{
                let price=parseFloat(item.price)
                if(price<6.3) return "red"
                if(price>6.3) return "green"
                return 'orange'
            }),
            fill:false,
            pointRadius:0,
            borderWidth:3,
            lineTension:0.1,
          }
          
        ],
      };

      const options = {
        responsive:true,
        plugins: {
          legend: {
            display:false
          },
        },
        scales:{
            x:{
                display:false
            },
            y:{
                display:false
            }
        }
      };



  return (
    <div style={{ width: 100, height: 50 }}>
      <Line options={options} data={ChartData} />
    </div>
  )
}

export default LineChart
