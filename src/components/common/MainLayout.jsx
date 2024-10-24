import React from 'react'
import SideNavComp from './SideNav'
import HeaderComp from './Header'
import FooterComp from './Footer'
import ContentComp from './Content'
import { Layout } from 'antd'
import "../../styles/main.css"
import ProfileComponent from '../../pages/ProfilePage'

const MainLayout = () => {
  return (
    <Layout style={{minHeight:"100vh"}}>
    <SideNavComp/>
    <Layout>
      <HeaderComp/>
      {/* <ContentComp/>    */}
      <ProfileComponent/>
      <FooterComp/>
    </Layout>
    </Layout>
     
  )
}

export default MainLayout
