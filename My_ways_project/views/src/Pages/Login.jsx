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
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            value={email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            value={password}
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
