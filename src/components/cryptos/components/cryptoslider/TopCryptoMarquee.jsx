import React from 'react';
import Slider from 'react-slick';
import { Card } from 'antd';
import useCryptoMarkets from '../../hooks/useCryptoMarkets';
import useCryptoHistory from '../../hooks/useCryptoHistory';
import millify from 'millify';
import LineChart from '../graphs/LineChart';
//import './TopCryptoMarquee.css'; // Custom CSS file for styling

const TopCryptoMarquee = () => {
  const { coins, isLoading, isError } = useCryptoMarkets();

  // Component to show historical data chart
  const HistoricalData = ({ coinId }) => {
    const { history} = useCryptoHistory(coinId);

    if (isLoading) {
      return <span>Loading...</span>;
    }
    if (isError) {
      return <span>Error loading data</span>;
    }

    return <LineChart data={history} style={{ width: '100px', height: '40px' }} />;
  };

  if (isLoading) {
    return <span>Loading coins...</span>;
  }

  if (isError) {
    return <span>Error loading coins</span>;
  }

  // Slider settings for react-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 cards per slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Move every 3 seconds
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Slider {...settings}>
        {coins.map((coin) => (
          <div key={coin.uuid} style={{ padding: '10px' }}>
            <Card
              bordered
              hoverable
              style={{ borderRadius: '8px', padding: '15px',margin:"10px",maxWidth:"280px" }}
              className="crypto-card"
            >
              {/* Icon and Graph Section */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <img src={coin.iconUrl} alt={coin.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                <HistoricalData coinId={coin.uuid} />
              </div>

              {/* Title Section */}
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                {coin.name} <span style={{ color: '#aaa' }}>{coin.symbol}</span>
              </div>

              {/* Price and Change Section */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  ${millify(coin.price)}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: parseFloat(coin.change) > 0 ? '#28a745' : '#dc3545' }}>
                  {parseFloat(coin.change).toFixed(2)}%
                </div>
              </div>

              
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopCryptoMarquee;
