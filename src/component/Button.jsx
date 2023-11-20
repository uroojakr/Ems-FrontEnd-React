import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = (props) => {
  return (
    <Button {...props}>
      {props.label}
    </Button>
  );
};

export default CustomButton;


