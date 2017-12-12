import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson, peopleSelector} from '../../ducks/people'
import NewPersonForm from '../people/NewPersonForm'
import ShowPersons from '../people/ShowPersons'


class PersonPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Add new person</h2>
                <NewPersonForm onSubmit={this.props.addPerson}/>
                <ShowPersons people={this.props.people} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    people: peopleSelector(state),
})


export default connect(mapStateToProps, {addPerson})(PersonPage)