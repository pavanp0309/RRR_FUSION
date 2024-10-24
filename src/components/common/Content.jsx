import React from 'react'
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const {  Content,  } = Layout;

const ContentComp = () => {
  return (
  <Content>
    Main Content
    <Outlet/>
  </Content>
  )
}

export default ContentComp
