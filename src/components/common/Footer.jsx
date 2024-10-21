import React from 'react'
import { Layout } from 'antd';
const {Footer}=Layout;

const FooterComp = () => {
  return (
    <Footer style={{textAlign: 'center'}}>
    RRA Fusion ©{new Date().getFullYear()} 
   </Footer>
  )
}

export default FooterComp
