import React from 'react';
import './PeopleList.css';

export default function PeopleList(props) {
  return (
    <React.Fragment>
      <table className="people-list">
        <caption>People list</caption>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.people.map(person => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
