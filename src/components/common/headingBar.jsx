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
        <Col xs={9} md={6} lg={7}>
          <h1>{title}</h1>
        </Col>
        <Col xs={3} md={1} className="text-end">
          {children}
        </Col>
        <Col xs={12} md={3} lg={2}>
          {filterOptions && filterOptions.length > 0 && (
            <Select
              options={filterOptions}
              onChange={onFilter}
              value={statusFilter}
              name="posh-user-status-filter"
            />
          )}
        </Col>
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
