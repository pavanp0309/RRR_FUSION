import React from 'react'
import { Layout, Menu } from 'antd';
const {Sider}=Layout;
import { HomeOutlined ,DollarOutlined,BookOutlined,ShopOutlined,TeamOutlined,ReadOutlined,UserOutlined} from '@ant-design/icons';


const SideNavComp = () => {
  let items=[
    {key:1 , icon:<HomeOutlined /> ,label:"Home",to:"/"},
    {key:2 , icon:<DollarOutlined />,label:"Crypto",to:"/Crypto"},
    {key:3 , icon:<BookOutlined /> ,label:"Academic",to:"/Academic"},
    {key:4 , icon:<ShopOutlined /> ,label:"Ecommerce",to:"/Ecommerce"},
    {key:5 , icon:<TeamOutlined /> ,label:"Hrm",to:"/Hrm"},
    {key:6 , icon:<ReadOutlined /> ,label:"News",to:"/News"},
    {key:7 , icon:<UserOutlined /> ,label:"Profile",to:"/Profile"}
  ]
  return (
    <Sider breakpoint="sm" >
      <div className="brand-logo" >RRA FUSION</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} >
        {items.map((items)=>{
          <Menu.Item key={items.key } icon={items.icon}>
            <span>{items.label}</span>
          </Menu.Item>
        })}
      </Menu>
    </Sider>
  )
}

export default SideNavComp
