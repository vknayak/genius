import React from 'react';
import { TextField } from '@material-ui/core';

const NGTextField  = ({ register, field, fullWidth }) => (
  <TextField
    fullWidth={fullWidth}
    name={field.name}
    id={field.name}
    inputRef={register}
    variant="outlined"
    {...field.customProps}
  />
);

export default NGTextField;