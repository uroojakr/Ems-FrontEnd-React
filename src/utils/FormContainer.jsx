//validations

import React, { useState } from 'react';
import TextField from '../component/Input';

const FormContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    //  validation logic 
    if (value.trim() === '') {
      setInputError('This field is required');
    } else {
      setInputError('');
    }
  };

  return (
    <div>
      <form>
        <TextField
          label="Username"
          value={inputValue}
          onChange={handleInputChange}
          error={!!inputError}
          helperText={inputError || 'Please enter your username'}
        />
      </form>
    </div>
  );
};

export default FormContainer;
