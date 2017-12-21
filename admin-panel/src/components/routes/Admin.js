import React, { Component } from 'react'
import VirtualizedLazyTable from '../events/VirtualizedLazyTable'
import PeopleList from '../people/PeopleList'
import SelectedEvents from '../events/SelectedEvents'
import Trash from '../events/Trash'

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <Trash />
                <SelectedEvents />
                <PeopleList />
                <VirtualizedLazyTable />
            </div>
        )
    }
}

export default Admin