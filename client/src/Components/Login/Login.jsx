import React from "react";
import "./Login.css";

function Login() {
  return (
    <div>
      <div>
        <div>
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <button>Login</button>
            <div>
              <input type="checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div>Forgot Password ?</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
