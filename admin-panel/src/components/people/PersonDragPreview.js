import React, { Component } from 'react'
import {connect} from 'react-redux'
import {personSelector} from '../../ducks/people'

class PersonDragPreview extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>{this.props.person.email}</h2>
            </div>
        )
    }
}

export default connect((state, ownProps) => ({
    person: personSelector(state, ownProps)
}))(PersonDragPreview)