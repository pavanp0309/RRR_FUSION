  // SignIn.js
  import React from 'react';
  import { Form, Input, Button, Row, Col } from 'antd';
  import SocialLogin from './SocialNetwork';
  import useAuth from '../../hooks/useAuth';
  import { useNavigate } from 'react-router-dom';
   import '../../styles/login.css';  
 

  const SignIn = () => {
     let navigate=useNavigate()
     let {Login}=useAuth()
  
    const onFinish = async (values) => {
      const {email,password}=values
      await Login(email ,password)
      navigate("/")
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Row className="signin-container" justify="center" align="middle">
        <Col xs={24} md={16} lg={12} className="form-col">
          <Row>
            <Col xs={24} md={12} className="welcome-section">
              <h2>Welcome Back!</h2>
              <p>
                If you don’t have an account, create one to access all our features.
              </p>
              <Button type="primary" className="create-account-btn" onClick={()=>navigate('/register')} >
                Create Account
              </Button>
            </Col>
            <Col xs={24} md={12} className="form-section">
              <h2>Sign In</h2>
              <SocialLogin />
              <p>or sign in with your email</p>
              <Form
                name="signin"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="signin-btn">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  export default SignIn;
