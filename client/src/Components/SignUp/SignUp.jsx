import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");
    setRepeatPassword("");

    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, repeatPassword }),
      });

      if (res.status === 201) {
        toast.success("Sign up successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error("User Email already Exist or password does not match");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label htmlFor="rpt-password">Repeat Password</label>
          <input
            name="rpt-password"
            id="rpt-password"
            type="password"
            placeholder="Re-enter your Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account ?{" "}
          <span>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login here
            </Link>
          </span>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUp;
