import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson} from '../../../ducks/people'
import PeopleForm from '../../people/PeopleForm'

class People extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
        <h3>Add person for the upcoming event here:</h3>
        <PeopleForm onSubmit={this.onAddPerson}/>
      </div>
    )
  }

  onAddPerson = ({ firstName, lastName, email }) => this.props.addPerson(firstName, lastName, email)

}

export default connect(null, { addPerson })(People)