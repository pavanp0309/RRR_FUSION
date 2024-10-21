import React from 'react'
import { ClockCircleOutlined,BellOutlined } from '@ant-design/icons';
import {  Badge } from 'antd'

const Notifications = () => {
  return (
    <Badge
      count={
        <ClockCircleOutlined
          style={{
            color: '#f5222d',
          }}
        />
      }
    >
      <BellOutlined style={{fontSize:"24px", cursor:"pointer"}} />
    </Badge>
  )
}

export default Notifications
