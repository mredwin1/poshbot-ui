import React from 'react';
import { FormLabel, FormSelect, Form } from 'react-bootstrap';
import Options from './options';

const Select = (props) => {
  const { options, onChange, value, name, label, errors } = props;
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <FormSelect
        onChange={onChange}
        name={name}
        value={value}
        isInvalid={errors[name] ? true : false}
        required
      >
        <Options options={options} />
      </FormSelect>
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </>
  );
};

export default Select;
