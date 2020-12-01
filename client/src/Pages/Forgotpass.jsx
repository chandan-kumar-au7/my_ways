import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import "../Styles/ForgotNewPass.css";

function ForgotPass() {
  const history = useHistory();

  const [Newpass, setNewpass] = useState("");
  const [_id, set_id] = useState("");

  const NewpassSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("form submitted");
      console.log("formData ", { Newpass });

      set_id(localStorage.getItem("userID"));
      const token = localStorage.getItem("userDATA");
      console.log("user ID ", localStorage.getItem("userID"));
      const { data } = await axios({
        method: "Put",
        url: "/user/forgotpassword",
        headers: { Authorization: token },
        data: { _id: _id, Newpass },
      });
      console.log(data);

      history.push("/login");
    } catch (err) {
      console.log("Error in getting all data", err.message);
    }
  };

  return (
    <div className="varify">
      <h3>Forgot Password Newpass :</h3>
      <form onSubmit={NewpassSubmitHandler}>
        <input
          onChange={(e) => setNewpass(e.target.value)}
          type="number"
          className="varifyInputField"
          value={Newpass}
          placeholder="Your Newpass"
        />
        <button className="varifyInputField" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPass;
