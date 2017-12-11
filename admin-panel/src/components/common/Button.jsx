import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={className ? `button ${className}` : 'button'}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  className: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: '',
};
