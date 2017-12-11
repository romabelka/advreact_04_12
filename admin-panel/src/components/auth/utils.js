import validator from 'email-validator'

export const validate = ({ email, password }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  if (email && !validator.validate(email)) errors.email = 'incorrect email format'

  if (!password) errors.password = 'password is a required field'
  if (password && password.length < 8) errors.password = 'password is to short'

  return errors
}
