import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchBar from './searchBar';
import Select from './select';

const HeadingBar = (props) => {
  const {
    title,
    children,
    searchPlaceholder,
    search,
    onSearch,
    filterOptions,
    onFilter,
    statusFilter,
  } = props;

  return (
    <React.Fragment>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Col xs={5} md={3} lg={5}>
          <h1>{title}</h1>
        </Col>
        <Col xs={3} md={1} className="text-end">
          {children}
        </Col>
        {filterOptions && filterOptions.length > 0 && (
          <Col xs={4} md={3} lg={2}>
            <Select
              options={filterOptions}
              onChange={onFilter}
              value={statusFilter}
              name="posh-user-status-filter"
            />
          </Col>
        )}
        <Col xs={12} md={5} lg={4}>
          <SearchBar
            onSearch={onSearch}
            value={search}
            placeholder={searchPlaceholder}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default HeadingBar;
