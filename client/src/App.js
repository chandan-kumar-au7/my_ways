import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import Login from "./Pages/Login";
import Forgotpass from "./Pages/Forgotpass";
import Register from "./Pages/Register";
import Varify from "./Pages/Varify";
import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/Home";
import Error from "./Pages/Error";
import Footer from "./Pages/Footer";
import Thankyou from "./Pages/Thankyou";

// import logo from "./logo.svg";
import "./App.css";

function App() {
  const history = useHistory();

  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("userDATA");

    if (token) {
      const decoded = jwt_decode(token);
      setisLoggedIn(true);
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setisLoggedIn(false);

        history.push("/login");
      }
    }
  }, [history]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/varify" component={Varify} />
          <Route exact path="/forgotpassword" component={Forgotpass} />
          <Route exact path="/thankyou" component={Thankyou} />

          <Route to="/error" component={Error} />

          <Redirect to="/error" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
