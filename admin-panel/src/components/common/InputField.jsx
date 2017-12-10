import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css';

export default function renderField(props) {
  const {
    input,
    label,
    meta: { touched, error },
    className,
    ...rest
  } = props;

  return (
    <div className={className ? `input-field ${className}` : 'input-field'}>
      {label &&
        <span className="input-field__label">
          {label}
        </span>
      }
      <br />
      <input
        className="input-field__input"
        {...rest}
        {...input}
      />
      {touched &&
        error &&
        <span className="input-field__error">
          {error}
        </span>
      }
    </div>
  );
}

renderField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({}).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

renderField.defaultProps = {
  label: '',
  className: '',
};
