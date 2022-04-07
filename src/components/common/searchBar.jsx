import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const SearchBar = (props) => {
  const { onSearch, value, placeholder } = props;
  return (
    <InputGroup>
      <InputGroup.Text id="search-icon">
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <FormControl
        className="form-control"
        type="text"
        placeholder={placeholder}
        name="search"
        onChange={(event) => onSearch(event.target.value)}
        value={value}
        aria-label="search"
        aria-describedby="search-icon"
      />
    </InputGroup>
  );
};

export default SearchBar;
