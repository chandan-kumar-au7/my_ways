import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import "../Styles/register_form.css";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("form submitted");
      const { data } = await axios({
        method: "get",
        url: "localhost:4000",
      });
      console.log(data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          email: email,
          password: password,
        })
      );

      history.push("/");
    } catch (err) {
      console.log("Error in getting all data", err.message);
    }
  };

  return (
    <center>
      <div className="register_form">
        <h2>Sign Up</h2>
        <h4>It's Quick And Easy</h4>
        <br />

        <form onSubmit={formSubmitHandler}>
          <div className="form-group">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control sameInputField"
              value={name}
              placeholder="First Name"
            />

            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control sameInputField"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              value={password}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </center>
  );
};

export default Register;
