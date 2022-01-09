import { useState } from 'react';

const initialState = {};

export const useForm = () => {
  const [formValue, setFormValue] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const resetForm = () => {
    setFormValue(initialState);
  };

  return [formValue, handleInputChange, resetForm];
};
