import React, { Component } from 'react';
import { FormSelect, FormLabel, Col, Form } from 'react-bootstrap';
import Options from './options';

class CategoriesSelect extends Component {
  render() {
    const values = {
      Category: 'category',
      'Secondary Category': 'secondaryCategory',
      'Sub Category': 'subcategory',
    };
    const { categoryOptions, onSelect, newListing, errors } = this.props;
    return categoryOptions.map((categoryOption) => {
      return (
        <Col key={categoryOption.name} xs={12} md={4}>
          <FormLabel>{categoryOption.name}</FormLabel>
          <FormSelect
            onChange={onSelect}
            name={categoryOption.name}
            value={newListing[values[categoryOption.name]]}
            isInvalid={errors[values[categoryOption.name]] ? true : false}
            required
          >
            <Options
              options={categoryOption.items}
              name={categoryOption.name}
            />
          </FormSelect>
          <Form.Control.Feedback type="invalid">
            {errors[values[categoryOption.name]]}
          </Form.Control.Feedback>
        </Col>
      );
    });
  }
}

export default CategoriesSelect;
