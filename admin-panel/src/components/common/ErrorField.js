import React from 'react'

function ErrorField(props) {
    const {label, input, type, meta: {error, touched}} = props
    const errorText = touched && error && <div style={{color: 'red'}}>{error}</div>
    return (
        <div>
            <label>{label || input.name}</label>
            <input {...input} type={type}/>
            {errorText}
        </div>
    )
}

export default ErrorField