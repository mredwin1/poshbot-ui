import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ListingBody = (props) => {
  const { title, id, onDelete, originalPrice, listingPrice, size, brand } =
    props;
  return (
    <React.Fragment>
      <Row>
        <Col>
          <span className="fs-6">{title}</span>
        </Col>
      </Row>
      <Row style={{ justifyContent: 'start' }} className="my-1">
        <Col>
          <span style={{ paddingRight: '1rem' }} className="fs-6 fw-bold">
            {listingPrice}
          </span>
          <span className="fs-6 text-decoration-line-through">
            {originalPrice}
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="fs-6">Size: {size}</span>
          <span className="border-end border-secondary mx-2"></span>
          <span className="fs-6">{brand}</span>
        </Col>
      </Row>
      <hr className="mb-0 mt-4" />
      <Row style={{ justifyContent: 'end' }} className="pt-1">
        <Col xs={2}>
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>Edit Listing</Tooltip>}
          >
            <i
              className="bi bi-pen"
              style={{ cursor: 'pointer', fontSize: '1.2rem' }}
              onClick={() => onDelete(id)}
            ></i>
          </OverlayTrigger>
        </Col>
        <Col xs={2}>
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>Delete Listing</Tooltip>}
          >
            <i
              className="bi bi-trash"
              style={{ cursor: 'pointer', fontSize: '1.2rem' }}
              onClick={() => onDelete(id)}
            ></i>
          </OverlayTrigger>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ListingBody;
