import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const PostForm = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    history.push("/postdetails");
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-5 m-auto">
          <form onSubmit={formSubmitHandler}>
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
              <label htmlFor="exampleInputSurname1">Surname</label>
              <input
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                className="form-control"
                value={surname}
                id="exampleInputSurname1"
              />
            </div>
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
