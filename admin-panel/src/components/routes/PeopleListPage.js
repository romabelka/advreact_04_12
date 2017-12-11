import React from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'

function PeopleListPage(props) {
    return (
        <div>
            <h2>People List</h2>
            {props.people.map((p, idx) => (
                <div key={p.id}>
                    {idx}. {p.email} {p.firstName} {p.lastName}
                </div>
            ))}
        </div>
    )
}

export default connect(state => {
    return {
        people: peopleSelector(state)
    }
}, {})(PeopleListPage)
