import React, { Component } from 'react'

const ShowPersons = (props) => {
    const {people}=props
    if (people.size === 0) return null
    return(
        <table border="1">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
        </thead>
            <tbody>
                {people.map((person) => (
                    <tr key={person.id}>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default  ShowPersons