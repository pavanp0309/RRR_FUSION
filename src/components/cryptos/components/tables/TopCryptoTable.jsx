import React from 'react'
import {Table} from 'antd';
import useCryptoMarkets from '../../hooks/useCryptoMarkets'
import useCryptoHistory from '../../hooks/useCryptoHistory';
import millify from 'millify';
import LineChart from '../graphs/LineChart';

const TopCryptoTable = () => {
  let {coins, isLoading, isError} = useCryptoMarkets()

   const columns = [
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        responsive: ["xs","sm", "md", "lg", "xl"],
        align:"center"
      },
      {
        title: 'Coin',
        dataIndex: 'name',
        key: 'name',
        render: (text,record) => (
          <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
            <img src={record.iconUrl}alt={record.name}style={{width:"30px"}}/>
            <div>{record.symbol}</div>
          </div>
        ),
        responsive: ["xs","sm", "md", "lg", "xl"],
        align:"center"
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => `$${millify(text)}`,
        responsive: ["xs","sm", "md", "lg", "xl"],
        align:"center"
      },
      {
        title: 'Total24hVol',
        dataIndex: '24hVolume',
        key: '24hVolume',
        render: (text) => `$${millify(parseFloat(text).toLocaleString())}`,
        responsive: ["xs","sm", "md", "lg", "xl"],
        align:"center"
      },
      {
        title: 'MarketCap',
        dataIndex: 'marketCap',
        key: 'marketCap',
        render: (text) => `$${millify(text)}`,
        responsive: ["xs","sm", "md", "lg", "xl"],
        align:"center"
      },
      {
        title: 'Change',
        dataIndex: 'change',
        key: 'change',
        render: (text) => (<span style={{color:parseFloat(text)<0?"red":"green"}}>
          {parseFloat(text).toFixed(2)}%</span>),
        responsive: ["xs","sm", "md", "lg", "xl"],
        align:"center"
      },

      {
        title:'Graph',
        dataIndex:'uuid',
        key:'uuid',
        render: (coinId) => (
          <div>
            <HistoricalData data={coinId}/>

          </div>
        ),
        responsive:["xs","sm","md","lg","xl"],
        align:"center"
      },
      
   ]

   const HistoricalData=({data})=>{
    console.log("hd",data)
    const {history,isError,isLoading}=useCryptoHistory(data)

    if(isLoading){
      return <span>loading...</span>
    }
    if(isError){
      return <span>error</span>
    }

    return <LineChart data={history}/>

   }
  
  
    return  (

        <Table columns={columns} key={coins.uuid} align="center" 
        dataSource={coins} bordered 
        rowHoverable={true}
        loading={isLoading} 
        scroll={{x:"max-content"}}/>

    )
}

export default TopCryptoTable
