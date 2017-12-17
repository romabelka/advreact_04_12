import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import validator from 'email-validator';

import ErrorField from '../common/ErrorField';

class NewUserForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <h3>Add user</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        First name: <Field name='firstName' component={ErrorField} />
                    </div>
                    <div>
                        Last name: <Field name='lastName' component={ErrorField} />
                    </div>
                    <div>
                        Email: <Field name='email' component={ErrorField} type='email' />
                    </div>
                    <input type='submit' />
                </form>

            </div>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {};

    if (!email) errors.email = 'Email is a required field';
    if (email && !validator.validate(email)) errors.email = 'Incorrect email format';

    if (!firstName) errors.firstName = 'First name is a required field';
    if (!lastName) errors.lastName = 'Last name is a required field';

    return errors;
}

export default reduxForm({
    form: 'new-user',
    validate
})(NewUserForm)