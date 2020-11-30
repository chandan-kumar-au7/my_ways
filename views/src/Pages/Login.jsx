import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/login.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState("false");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const userRegisterData = localStorage.getItem("userRegister");
    const parseddata = JSON.parse(userRegisterData);
    if (!userRegisterData) {
      alert("REGISTER First ...");
      history.push("/register");
    } else if (parseddata.email === email && parseddata.password === password) {
      setisLoggedIn(true);

      history.push("/calc");
    } else {
      alert("Invalid Credientials");
    }
  };

  return (
    <div className="loginform">
      <br />
      <h2 style={{ textAlign: "left" }}>Login</h2>
      <br />

      <form onSubmit={formSubmitHandler} className="form_name">
        <br />
        <u style={{ color: "#7ecb20", fontSize: "20px", margin: "20px" }}>
          Student
        </u>
        <br />
        <br />
        <div className="form-group">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control login_input"
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control login_input"
            value={password}
            placeholder="Password"
          />
        </div>
        <br />
        <p className="paragraphforforgotpass">Forgot Password ?</p>
        <br />
        <button type="submit" className="btn btn-primary login_input">
          Login
        </button>
        <br />
        <p>New to MyWays? Sign Up here</p>
        <br />
      </form>
    </div>
  );
};

export default Login;
