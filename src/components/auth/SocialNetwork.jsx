// SocialLogin.js
import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="social-login">
      <Button
        shape="circle"
        icon={<GoogleOutlined />}
        size="large"
        className="social-btn google"
        onClick={signInWithGoogle}
      />
      <Button
        shape="circle"
        icon={<FacebookOutlined />}
        size="large"
        className="social-btn facebook"
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
