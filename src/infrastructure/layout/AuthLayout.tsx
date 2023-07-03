import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { IMAGES } from '@/assets/images';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <React.Fragment>
      <section className="signin-section">
        <Row className="m-0 h-100">
          <Col md={6} className="p-0">
            <div className="bg-primary h-100">
              <img src={IMAGES.LOGO_WHITE} className="main-login-logo" alt="logo" />
              <div className="login-side-image">
                <img src={IMAGES.LOGIN} alt="login" />
              </div>
            </div>
          </Col>
          <Col md={6} className="p-0">
            <div className="bg-gray d-flex justify-content-center align-items-center h-100">
              <div className="w-50">
                <h4>Welcome Back</h4>
                <p className="mb-5">Please enter your email and password</p>
                <Outlet />
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </React.Fragment>
  );
};

export default AuthLayout;
