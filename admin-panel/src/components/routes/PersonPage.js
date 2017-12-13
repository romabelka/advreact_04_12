import React from 'react'
import {connect} from 'react-redux'
import {addPerson, peopleSelector} from '../../ducks/people'
import NewPersonForm from '../people/NewPersonForm'
import PeopleList from '../people/PeopleList';

const PersonPage =
  ({addPerson, peopleList}) =>
    <div>
        <h2>Add new person</h2>
        <NewPersonForm onSubmit={addPerson}/>
        <PeopleList list={peopleList}/>
    </div>


export default connect(state => ({
    peopleList: peopleSelector(state)
}), {addPerson})(PersonPage)