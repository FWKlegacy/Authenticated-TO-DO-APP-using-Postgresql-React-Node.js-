import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success("Login successful! Redirecting...", { autoClose: 1500 });
        localStorage.setItem("token", data.token);
        console.log("JWT Token Stored:", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error("Failed to login. Please check your credentials! ⚠️");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Dont have an account ?{" "}
          <Link to="/signup" className="link">
            Sign up here
          </Link>
        </p>
      </form>

      <ToastContainer />
    </>
  );
};

export default Login;
