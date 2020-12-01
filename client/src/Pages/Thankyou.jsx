import React, { useEffect } from "react";
import { ReactComponent as Ok } from "../images/ok.svg";
import { useHistory } from "react-router-dom";

import "../Styles/ok.css";

function Thankyou() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 3000);
  });

  return (
    <div className="ok">
      <Ok />
      <h3>Thanks Successfull. </h3>
    </div>
  );
}

export default Thankyou;
