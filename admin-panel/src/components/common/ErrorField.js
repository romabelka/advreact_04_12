import React, { Component } from 'react'

class ErrorField extends Component {
    static propTypes = {

    };

    render() {
        const {input, meta: { error, touched }, type} = this.props
        const errorMessage = error && touched && <h4 style={{color: 'red'}}>{error}</h4>
        return (
            <div>
                <input {...input} type={type} />
                {errorMessage}
            </div>
        )
    }
}

export default ErrorField