import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'

class AddPeopleForm extends Component {
    render() {
        return (
            <div>
                <h3>Add people</h3>
                <form>
                    <div>
                        FirstName: <Field name='firstname' component='input'/>
                    </div>
                    <div>
                        LastName: <Field name='lastname' component='input'/>
                    </div>
                    <div>
                        Email: <Field name='email' component='input'/>
                    </div>
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'addPeopleForm' 
})(AddPeopleForm);
