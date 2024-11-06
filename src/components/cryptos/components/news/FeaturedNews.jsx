import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col } from 'antd';
import useGeneralNews from '../../hooks/useGeneralNews';
const { Meta } = Card;

const FeaturedNews = () => {
//fetching the news
const {news,isLoading,isError}=useGeneralNews()

let FeaturedNews=news.slice(0,3)

console.log("news",news)
  return (
    <Row>{
        FeaturedNews.map((news)=>(
            <Col className="general-news" xs={24}sm={24}md={8}lg={8} onLoad={isLoading} 
            style={{padding:"16px",overflowx:"hidden"}}>
    <Card
    
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={news.image}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title={news?.source?.name}
      description={news.title}
    />
  </Card>
  </Col>
        ))}
  </Row>
  )
}

export default FeaturedNews
