import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
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
