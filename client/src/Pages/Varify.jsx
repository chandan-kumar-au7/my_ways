import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

import "../Styles/Varify.css";

function Varify() {
  const history = useHistory();

  const [otp, setotp] = useState("");
  const [_id, set_id] = useState("");

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("form submitted");
      console.log("formData ", { otp });

      set_id(localStorage.getItem("userID"));
      console.log("user ID ", localStorage.getItem("userID"));
      const { data } = await axios({
        method: "Put",
        url: "/user/otpvarify",
        data: { _id: _id, otp },
      });
      console.log(data);

      history.push("/login");
    } catch (err) {
      console.log("Error in getting all data", err.message);
    }
  };

  return (
    <div className="varify">
      <h3>Varify Otp :</h3>
      <form onSubmit={otpSubmitHandler}>
        <input
          onChange={(e) => setotp(e.target.value)}
          type="number"
          className="varifyInputField"
          value={otp}
          placeholder="Your Otp"
        />
        <button className="varifyInputField" type="submit">
          Varify
        </button>
      </form>
    </div>
  );
}

export default Varify;
