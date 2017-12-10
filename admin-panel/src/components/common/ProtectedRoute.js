import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { userSelector } from "../../ducks/auth";

class ProtectedRoute extends Component {
  static propTypes = {};

  render() {
    const { component, authorized, ...rest } = this.props;
    return <Route {...rest} render={this.renderAuthorized} />;
  }

  renderAuthorized = ({ match }) => {
    //        const {authorized, ...rest} = this.props
    return this.props.authorized ? (
      <this.props.component match={match} />
    ) : (
      <h1>UnAuthorized</h1>
    );
  };
}

export default connect(
  state => ({
    authorized: userSelector(state),
  }),
  null,
  null,
  { pure: false },
)(ProtectedRoute);
