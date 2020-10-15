import React from 'react';
import { TextField } from '@material-ui/core';

export default ({ name, className = undefined, placeholder = '', values = undefined, errors, touched = {}, ...rest }) => (
  <TextField
    name={name}
    className={className}
    label={placeholder}
    margin="normal"
    variant="outlined"
    error={!!(errors[name] && touched[name])}
    helperText={touched[name] && errors[name] ? errors[name].message : null}
    {...rest}
  />
);
