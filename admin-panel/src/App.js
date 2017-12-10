import React, { Component } from "react";
import { Route } from "react-router-dom";
import Auth from "./components/routes/auth";
import Admin from "./components/routes/Admin";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/admin" component={Admin} />
      </div>
    );
  }
}

export default App;
