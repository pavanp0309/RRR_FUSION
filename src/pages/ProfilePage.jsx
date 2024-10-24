import React, { useState } from 'react';
import { Card, Avatar, Button, Input, Divider, Select, Modal, message, Switch } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const { Option } = Select;

const ProfileComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordStatus, setOldPasswordStatus] = useState(null);

  const auth = getAuth();

  // Function to verify the old password
  const verifyOldPassword = () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        setOldPasswordStatus('matched');
      })
      .catch(() => {
        setOldPasswordStatus('mismatch');
      });
  };

  // Function to handle password change
  const handlePasswordChange = () => {
    if (oldPasswordStatus !== 'matched') {
      message.error('Old password is not verified.');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password do not match.');
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) return;

    updatePassword(currentUser, newPassword)
      .then(() => {
        message.success('Password updated successfully!');
        setIsChangePasswordVisible(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOldPasswordStatus(null);
      })
      .catch((error) => {
        message.error('Failed to update password: ' + error.message);
      });
  };

  // Function to handle cancel
  const handleCancel = () => {
    setIsChangePasswordVisible(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOldPasswordStatus(null);
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
          <Switch defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Email Notifications</span>
          <Switch defaultChecked />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>SMS Notifications</span>
          <Switch />
        </div>
      </div>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Security Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: 'white' }}>Security</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ color: 'white' }}>Change Password</span>
          <Button type="dashed" icon={<LockOutlined />} onClick={() => setIsChangePasswordVisible(true)}>
            Change
          </Button>
        </div>
      </div>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={isChangePasswordVisible}
        onOk={handlePasswordChange}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handlePasswordChange}>
            Submit
          </Button>,
        ]}
      >
        <div>
          <Input.Password
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setOldPasswordStatus(null);
            }}
            onBlur={verifyOldPassword}
            style={{ marginBottom: 10 }}
          />
          {oldPasswordStatus === 'mismatch' && (
            <p style={{ color: 'red' }}>
              <CloseCircleOutlined /> Password mismatch
            </p>
          )}
          {oldPasswordStatus === 'matched' && (
            <p style={{ color: 'green' }}>
              <CheckCircleOutlined /> Password match
            </p>
          )}
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input.Password
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: 10 }}
          />
        </div>
      </Modal>

      <Divider style={{ backgroundColor: '#444' }} />

      {/* Connected Accounts Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: 'white' }}>Connected Accounts</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Google</span>
          <Button type="primary" ghost>Connected</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: 'white' }}>Facebook</span>
          <Button type="primary" ghost>Connected</Button>
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
        <Button type="primary" danger>
          Delete Account
        </Button>
      </div>
    </Card>
  );
};

export default ProfileComponent;