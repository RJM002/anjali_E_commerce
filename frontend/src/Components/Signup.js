import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";
import "./Singup.css"; // Assuming you'll use a separate CSS file for signup

function SignUp() {
  const [signInfo, setSignInfor] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInfor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signInfo;
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      const url = "http://localhost:8080/api/auth/singUp";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInfo),
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupFormContainer">
        <h1 className="signupHeading">Sign Up</h1>
        <form className="signupForm" onSubmit={handleSignup}>
          <div className="formField">
            <label className="formLabel" htmlFor="name">Name</label>
            <input
              value={signInfo.name}
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              className="formInput"
              placeholder="Enter your name..."
            />
          </div>
          <div className="formField">
            <label className="formLabel" htmlFor="email">Email</label>
            <input
              value={signInfo.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="formInput"
              placeholder="Enter your email..."
            />
          </div>
          <div className="formField">
            <label className="formLabel" htmlFor="password">Password</label>
            <input
              value={signInfo.password}
              onChange={handleChange}
              type="password"
              name="password"
              className="formInput"
              placeholder="Enter your password..."
            />
          </div>
          <button className="signupButton" type="submit">Sign Up</button>
          <span className="redirectText">
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
