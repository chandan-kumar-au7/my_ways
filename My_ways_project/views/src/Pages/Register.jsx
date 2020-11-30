import React, { useState } from "react";

import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { userRegister } from "../redux/actions/userAction";

const Register = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "userRegister",
      JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    );
    // dispatch(userRegister({ name, email, password }));
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
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
              <label htmlFor="exampleInputEmail2">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                value={name}
                id="exampleInputEmail2"
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
