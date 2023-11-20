import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function CustomTextField({ label, value, onChange, name,sx }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      name={name}
      sx={sx}
    />
  );
}

CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default CustomTextField;
