import {useState} from 'react';
import { Card, Avatar, Button, Input, Switch, Divider, Select } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const ProfileComponent = () => {
  
  // Access user data from the Redux store
  const user = useSelector((state) => state.auth.user); // Corrected to access the 'auth' slice

  const { deleteAccount, loading} = useAuth();
 
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
  });
  const navigate = useNavigate(); 

  // Toggle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Here you would handle profile update logic, e.g., updating user details in Firestore
    setIsModalVisible(false);
    message.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle Notification Switches
  const handleNotificationChange = (type, checked) => {
    setNotifications({
      ...notifications,
      [type]: checked,
    });
    message.info(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}`);
  };
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteAccount();
    }
  };

  // Function to handle connected accounts navigation
  const handleConnectAccount = (platform) => {
    const urls = {
      google: 'https://accounts.google.com/',
      facebook: 'https://www.facebook.com/',
      twitter: 'https://twitter.com/login',
    };

    if (urls[platform]) {
      window.location.href = urls[platform];
    } else {
      message.warning('Unknown platform');
    }
  };

  return (
    <Card style={{ maxWidth: 700, margin: '0 auto', backgroundColor: '#1a1a2e', color: 'white', padding: 20 }}>
      {/* Profile Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: 'white' }}>Profile</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Avatar size={80} icon={<UserOutlined />} style={{ marginRight: 20 }} />
          <div>
            <h3 style={{ color: 'white' }}>{user?.displayName || 'User Name'}</h3>
            <Button type="primary" style={{ marginTop: 10 }}>Edit Profile</Button>
          </div>
        </div>
        <Input 
          prefix={<MailOutlined />} 
          placeholder="Email" 
          value={user?.email || ''} 
          readOnly 
          style={{ marginBottom: 10, backgroundColor: '#2d2d44', color: 'white' }} 
        />
        <Input 
          prefix={<PhoneOutlined />} 
          placeholder="Mobile Number" 
          value={user?.phoneNumber || ''} 
          style={{ marginBottom: 10, backgroundColor: '#2d2d44', color: 'white' }} 
        />
        <Select 
          defaultValue={user?.role || 'user'} 
          style={{ width: '100%', marginBottom: 10, backgroundColor: '#2d2d44', color: 'white' }} 
          placeholder="Select Role"
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
          <Option value="guest">Guest</Option>
        </Select>
      </div>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Notifications Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: 'white' }}>Notifications</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Push Notifications</span>
          <Switch checked={notifications.push} onChange={(checked) => handleNotificationChange('push', checked)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Email Notifications</span>
          <Switch checked={notifications.email} onChange={(checked) => handleNotificationChange('email', checked)}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>SMS Notifications</span>
          <Switch checked={notifications.sms} onChange={(checked) => handleNotificationChange('sms', checked)}/>
        </div>
      </div>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Security Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: 'white' }}>Security</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Two-Factor Authentication</span>
          <Switch />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ color: 'white' }}>Change Password</span>
          <Button type="dashed" icon={<LockOutlined />} >
            Change
          </Button>
        </div>
      </div>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Connected Accounts Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: 'white' }}>Connected Accounts</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Google</span>
          <Button type="primary" ghost onClick={() => handleConnectAccount('google')}>Connected</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Facebook</span>
          <Button type="primary" ghost  onClick={() => handleConnectAccount('facebook')}>Connected</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Twitter</span>
          <Button type="primary" ghost>Connect</Button>
        </div>
      </div>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Danger Zone Section */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'red' }}>Danger Zone</h2>
        <Button type="primary" danger onClick={handleDeleteAccount} loading={loading} disabled={loading}>
          Delete Account
        </Button>
      </div>
    </Card>
  );
};

export default ProfileComponent;
