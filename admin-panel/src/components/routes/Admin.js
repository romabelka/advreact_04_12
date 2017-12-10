import React, { Component } from "react";
import AddPeopleForm from "../people/AddPeopleForm";
import { addPeople } from "../../ducks/people";
import { connect } from "react-redux";

class Admin extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h2>Admin Page</h2>
        <AddPeopleForm onSubmit={this.sendPeople} />
      </div>
    );
  }

  sendPeople = (people ) => this.props.addPeople(people);
}

export default connect(null, { addPeople })(Admin);
