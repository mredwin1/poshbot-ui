import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const Autocomplete = (props) => {
  const {
    isLoading,
    options,
    onSearch,
    placeholder,
    id,
    name,
    onItemSelect,
    displayField,
    imgField,
  } = props;

  return (
    <AsyncTypeahead
      filterBy={() => true}
      isLoading={isLoading}
      id={id}
      labelKey={displayField}
      minLength={3}
      onSearch={onSearch}
      options={options}
      placeholder={placeholder}
      renderMenuItemChildren={(option) => (
        <div onClick={(event) => onItemSelect(event, option, name)}>
          <img
            alt=""
            src={option[imgField]}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
            className="rounded-circle"
          />
          <span>{option[displayField]}</span>
        </div>
      )}
    />
  );
};

export default Autocomplete;
