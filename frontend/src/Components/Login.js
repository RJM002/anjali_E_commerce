import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";
import GoogleLoginButton from "./GoogleLoginButton";
import "../loginNew.css";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required.");
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, id, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userId", id);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        const details = error?.details[0]?.message || message;
        handleError(details);
      }
    } catch (err) {
      handleError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginFormContainer">
        <h1 className="loginHeading">Login</h1>
        <form className="formLogin" onSubmit={handleLogin}>
          <div className="loginDiv">
            <label className="labelLogin" htmlFor="email">
              Email
            </label>
            <input
              value={loginInfo.email}
              onChange={handleChange}
              type="email"
              className="inputLogin"
              name="email"
              placeholder="Enter your email..."
              required
            />
          </div>
          <div className="loginDiv">
            <label className="labelLogin" htmlFor="password">
              Password
            </label>
            <input
              value={loginInfo.password}
              onChange={handleChange}
              type="password"
              className="inputLogin"
              name="password"
              placeholder="Enter your password..."
              required
            />
          </div>
          <button className="loginButton" type="submit">
            Login
          </button>
          <span className="signupPrompt">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
          <GoogleLoginButton />
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Login;
