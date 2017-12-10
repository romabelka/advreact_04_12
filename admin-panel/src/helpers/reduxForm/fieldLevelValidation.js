export const required = value => (
  value ? undefined : 'Required'
);

export const minLength = min => value => (
  value && value.length < min ? `Must be ${min} character or more` : undefined
);

export const maxLength = max => value => (
  value && value.length > max ? `Must be ${max} character or less` : undefined
);

export const allowedChars = value => (
  value && !/^[А-ЯA-Z]+$/i.test(value) ? 'Only letters are allowed' : undefined
);

export const invalidEmail = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
);
