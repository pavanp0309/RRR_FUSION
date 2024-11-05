import React from 'react'
import { Layout ,Divider} from 'antd';
const {  Content,  } = Layout;
import { Outlet } from 'react-router-dom';
import GlobalCoinStats from '../cryptos/components/globalcoinstats/GlobalCoinStats';
import TopCryptoTable from '../cryptos/components/tables/TopCryptoTable';
import BestCryptos from '../cryptos/components/bestcoinstats/BestCryptos';
import FilterCard from '../cryptos/components/cardfilters/FilterCard';
import FeaturedNews from '../cryptos/components/news/FeaturedNews';

const ContentComp = () => {

  return (
  <Content>
   <GlobalCoinStats/>
   <Divider orientation="left" style={{fontSize:"10px"}}>BESTCOINS</Divider>
   <BestCryptos/>
   <Divider orientation="left" style={{fontSize:"10px"}}>Top10Coins</Divider>
   <TopCryptoTable/>
   <Divider orientation="left" style={{fontSize:"10px"}}>Top3Cryptos</Divider>
   <FilterCard/>
   <FeaturedNews/>
    <Outlet/>
  </Content>
  )
}

export default ContentComp
