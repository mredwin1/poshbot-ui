import React from 'react';
import { FormLabel, FormSelect, Form } from 'react-bootstrap';
import Options from './options';

const Select = (props) => {
  const { options, onChange, value, name, label, errors } = props;

  // Check if errors is undefined and set isInvalid accordingly
  const isInvalid = errors && errors[name] ? true : false;

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}

      <FormSelect
        onChange={onChange}
        name={name}
        value={value}
        isInvalid={isInvalid}
        required
      >
        <Options options={options} />
      </FormSelect>
      {errors && (
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default Select;
