import React from "react";
import { GoogleOutlined } from "@ant-design/icons";

const Login = () => {
  return (
    <>
      <div id="login-page">
        <div id="login-card">
          <h2>OviApp</h2>
          <div className="login-button google">
            <GoogleOutlined /> Sign in with Google
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
