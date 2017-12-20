import React, { Component } from 'react'
import VirtualizedLazyTable from '../events/VirtualizedLazyTable'
import PeopleList from '../people/PeopleList'
import SelectedEvents from '../events/SelectedEvents'
import Bucket from '../events/Bucket';

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <SelectedEvents />
                <PeopleList />
                <Bucket/>
                <VirtualizedLazyTable />
            </div>
        )
    }
}

export default Admin