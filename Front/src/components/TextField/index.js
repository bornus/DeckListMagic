import React from 'react';
import { TextField } from '@material-ui/core';

export default ({ name, className = undefined, placeholder = '', values = undefined, errors = {}, touched = {}, errorText = null, ...rest }) => (
  <TextField
    name={name}
    className={className}
    label={placeholder}
    margin="normal"
    variant="outlined"
    error={errorText || !!(errors[name] && touched[name])}
    helperText={errorText ? 
      errorText 
      : ((touched[name] && errors[name]) 
        ? errors[name].message 
        : null)}
    {...rest}
  />
);
