import React from 'react'
import { Layout ,Button, Menu} from 'antd';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import SearchBar from './SearchBar';
import ThemeChanger from './ThemeChanger';
import { MenuFoldOutlined } from '@ant-design/icons';
import "../../styles/header.css"


const {Header}=Layout;


const HeaderComp = () => {
  return (
  <Header className='header'>
    {/* Toggle button start */}
    <div className="toggle-btn">
    <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
       <MenuFoldOutlined/>
      </Button>
    </div>
    {/* Toggle button end */}
    <div className="header-left">
        <SearchBar/>
    </div>
    <div className="header-right">
          <ThemeChanger/>
          <Notifications/>
          <UserProfile/>
    </div>
  </Header>
  )
}

export default HeaderComp
