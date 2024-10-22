// SocialLogin.js
import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
  const { GoogleSignIn,facebookSignIn,loading } = useAuth();

  return (
    <div className="social-login">
      <Button
        shape="circle"
        icon={<GoogleOutlined />}
        size="large"
        className="social-btn google"
        loading={loading}
        disabled={loading}
        onClick={GoogleSignIn}
      />
      <Button
        shape="circle"
        icon={<FacebookOutlined />}
        size="large"
        className="social-btn facebook"
        loading={loading}
        disabled={loading}
        onClick={facebookSignIn}
      />
      <Button
        shape="circle"
        icon={<LinkedinOutlined />}
        size="large"
        className="social-btn linkedin"
      />
    </div>
  );
};

export default SocialLogin;
