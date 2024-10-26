import React from 'react'
import { Avatar, Menu } from 'antd';
import { Dropdown } from "antd";
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserOutlined, SettingOutlined, HomeOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';



const UserProfile = () => {
  let navigate = useNavigate()
  let { Logout } = useAuth()

  let isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  let user = useSelector(state => state.auth.user)

  // function to handle the Logout 
  let handleLogout = async () => {
    try {
      await Logout()
      navigate("/signin")
    } catch (error) {
      console.log("error in login", error.message)
    }
  }


  //  home Profile settings Logout and Logoin
  const menu = (
    <Menu>

      {
        isAuthenticated ? (
          <>
            <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />} onClick={()=>navigate('/profile')}>Profile</Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => handleLogout()}>Logout</Menu.Item>
          </>
        ) : (
          <Menu.Item key="4" icon={<LoginOutlined />} onClick={() => navigate("/signin")}>Login</Menu.Item>
        )
      }
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar
        src={user && user.photoURL || ""}

        size="large"
        icon={user && user.photoURL ? <UserOutlined /> : null}
      />
    </Dropdown>
  )
}

export default UserProfile
