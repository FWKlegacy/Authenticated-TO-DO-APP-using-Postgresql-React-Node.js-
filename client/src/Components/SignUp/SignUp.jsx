import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (repeatPassword !== password) {
      alert("password does not match");
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        console.log("sign up successful", response.status);
        navigate("/login");
      } else {
        console.log("Failed to sign up", response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className="container" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Enter your Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="rpt-password">Repeat Password</label>
      <input
        type="password"
        placeholder="Re-enter your Password"
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
