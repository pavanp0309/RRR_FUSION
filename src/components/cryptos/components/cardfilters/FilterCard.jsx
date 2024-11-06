import {useState,useEffect} from 'react'
import { Card,Select } from 'antd';
import useCryptoMarkets from '../../hooks/useCryptoMarkets';
import useCryptoHistory from '../../hooks/useCryptoHistory';
import LineBarChart from '../graphs/LineBarChart';

const {Option}=Select

//Timeperiod according to the api defaults

let timePeriod=["24h","3h","7d","30d","1y","3y","5y"] 

const FilterCard = () => {
    let[selectedtimePeriod,setSelectedTimePeriod]=useState("3y")

    //fetching the coins from cryptomarkets and displaying the required coins
    let{coins,isError,isLoading}=useCryptoMarkets()
    //console.log(coins)

    //filtering the coins required
    let filteredcoins=coins.filter(coin=>["BTC","ETH","BNB"].includes(coin.symbol))
    console.log(filteredcoins)

//to change the coin tabs
    const [activeTabKey, setActiveTabKey] = useState('');

    //getting the history of each coins for graphs

    const {history}=useCryptoHistory(activeTabKey,selectedtimePeriod)

    //tablist
    const tabList=filteredcoins.map((coin)=>(
        {
            key: coin.uuid,
            tab: coin.symbol

        }
    ))

    useEffect(()=>{
        if(coins.length>0){
            setActiveTabKey(coins[0].uuid)
        }
    },[coins])
//changing the different tabs
    const onTabChange = (key) => {
        setActiveTabKey(key);
      };
//updating the time periods
    const HandleSelectedTimeperiod=(value)=>{
      console.log("stp",value)
        setSelectedTimePeriod(value)
    }

//Filtering the selected_coin
    let selectedCoin=filteredcoins.find((coin)=>coin.uuid==activeTabKey)
    console.log(selectedCoin)
  return (
    <>
    <Card
        loading={isLoading}
        title={
          <>
          {
            selectedCoin?(
              <div className=''style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                <img src={selectedCoin.iconUrl}alt={selectedCoin.symbol}style={{width:"30px",marginRight:"3px"}}/>
                <span>{selectedCoin.symbol}</span>
              </div>
            ):"select coin"
          }
          </>
        }
        style={{
          width: '100%',
        }}
        tabList={tabList}
        activeTabKey={activeTabKey}
        extra={
          <Select
    
    defaultValue={selectedtimePeriod}
    onChange={ HandleSelectedTimeperiod}
    style={{
      width: '100%',
    }}
    >
      {
        timePeriod.map((period)=>(
          <Option key={period}value={period}>{period}</Option>
        ))
      }

    </Select>
  
          

        }
        onTabChange={onTabChange}
        tabProps={{
          size: 'middle',
        }}
      >
        <LineBarChart data={history}/>
      </Card>
      
    </>
  )
}

export default FilterCard
