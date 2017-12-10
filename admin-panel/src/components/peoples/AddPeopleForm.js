import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import validator from "email-validator";
import ErrorField from "../common/ErrorField";

class AddPeopleForm extends Component {
  render() {
    return (
      <div>
        <h3>Add people from Page</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            first name:
            <Field name="firstName" component={ErrorField} />
          </div>

          <div>
            last name:
            <Field name="lastName" component={ErrorField} />
          </div>

          <div>
            email: <Field name="email" component={ErrorField} />
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  }
}


const validate = ({ email, firstName, lastName }) => {
    const errors = {};

    if (!email) errors.email = "email is a required field";
    if (email && !validator.validate(email))
        errors.email = "incorrect email format";

    if (!firstName) errors.firstName = "firstName is a required field";
    if (!lastName) errors.firstName = "firstName is a required field";

    return errors;
};


export default reduxForm({
    form: "people",
    validate,
})(AddPeopleForm);
