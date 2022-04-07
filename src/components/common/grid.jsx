import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomPagination from './customPagination.jsx';

const Grid = (props) => {
  const { currentPage, itemsCount, pageSize, onPageChange, children } = props;
  return (
    <React.Fragment>
      <Row xs={12} md={2} lg={3} xl={4}>
        {children}
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Col xs={11} sm={3} md={4} style={{ justifyContent: 'center' }}>
          <CustomPagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></CustomPagination>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Grid;
