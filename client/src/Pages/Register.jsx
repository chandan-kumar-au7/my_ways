import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import "../Styles/register_form.css";

const Register = () => {
  const history = useHistory();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("form submitted");
      console.log("formData ", { firstname, lastname, email, password });

      const { data } = await axios({
        method: "Post",
        url: "/user/signup",
        data: { firstname, lastname, email, password },
      });
      console.log(data);
      localStorage.setItem("userID", data.userid);

      history.push("/varify");
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
              onChange={(e) => setfirstname(e.target.value)}
              type="text"
              className="form-control sameInputField"
              value={firstname}
              placeholder="First Name"
            />

            <input
              onChange={(e) => setlastname(e.target.value)}
              type="text"
              value={lastname}
              className="form-control sameInputField"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              className="form-control"
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => setpassword(e.target.value)}
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
