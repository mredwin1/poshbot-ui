import React from 'react';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';

const customPagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <Pagination style={{ justifyContent: 'center' }}>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage ? true : false}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default customPagination;
