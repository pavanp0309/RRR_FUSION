import React from 'react'
import { Layout } from 'antd';
const {  Content  } = Layout;
import { Outlet } from 'react-router-dom';

const ContentComp = () => {
  return (
  <Content>
   <Outlet/>
  </Content>
  )
}

export default ContentComp
