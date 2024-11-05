import React from 'react'
import useCryptoMarkets from '../../hooks/useCryptoMarkets'
import { Col, Divider, Row ,Card ,Statistic } from 'antd';
import millify from "millify";

const GlobalCoinStats = () => {
    let {globalStats,isError,isLoading}=useCryptoMarkets()
    console.log("gcs:",globalStats)
    // destructuring the global stats 
    const {total,total24hVolume,totalCoins,
        totalExchanges,totalMarketCap,totalMarkets}=globalStats || {}
  return (
    <div className='global-stats' style={{padding:"16px", overflowX:"hidden"}}>
  <Divider orientation="left" style={{fontSize:"10px"}}>GlobalStats</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col  xs={24} sm={12} md={8} lg={6}>
        <Card hoverable loading={isLoading}>
        <Statistic title="TotalCoins"  value={`$${millify(total)}`}  valueStyle={{ color: '#3f8600',fontWeight:"bold" }} />
        </Card>
      </Col>
      <Col  xs={24} sm={12} md={8} lg={6}>
        <Card hoverable loading={isLoading}>
        <Statistic title="TotalMarketCap"  value={`$${millify(totalMarketCap)}`}  valueStyle={{ color: '#3f8600',fontWeight:"bold" }} />
        </Card>
      </Col>
      <Col  xs={24} sm={12} md={8} lg={6}>
        <Card hoverable loading={isLoading}>
        <Statistic title="Total24hVolume"  value={`$${millify(total24hVolume)}`}  valueStyle={{ color: '#3f8600',fontWeight:"bold" }} />
        </Card>
      </Col>
      <Col  xs={24} sm={12} md={8} lg={6}>
        <Card hoverable loading={isLoading}>
        <Statistic title="TotalExchanges"  value={`$${totalExchanges}`}  valueStyle={{ color: '#3f8600',fontWeight:"bold" }} />
        </Card>
      </Col>
      </Row>
    </div>
  )
}

export default GlobalCoinStats
