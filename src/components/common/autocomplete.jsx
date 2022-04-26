import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const Autocomplete = (props) => {
  const { isLoading, options, onSearch } = props;

  return (
    <AsyncTypeahead
      filterBy={() => true}
      isLoading={isLoading}
      labelKey="username"
      minLength={3}
      onSearch={onSearch}
      options={options}
      placeholder="Search for a Posh User..."
      renderMenuItemChildren={(option) => (
        <React.Fragment>
          <img
            alt=""
            src={option.profile_picture}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
            className="rounded-circle"
          />
          <span>{option.username}</span>
        </React.Fragment>
      )}
    />
  );
};

export default Autocomplete;
