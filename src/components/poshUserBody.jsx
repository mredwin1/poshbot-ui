import React, { Component } from 'react';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

const PoshUserBody = (props) => {
  const {
    id,
    firstName,
    lastName,
    email,
    username,
    password,
    phoneNumber,
    campaignStatus,
    sales,
    onDelete,
  } = props;
  return (
    <React.Fragment>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <h5>
            {firstName} {lastName}
          </h5>
        </Col>
        <Col xs={2}>
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>Delete PoshUser</Tooltip>}
          >
            <i
              className="bi bi-trash"
              style={{ cursor: 'pointer', fontSize: '1.2rem' }}
              onClick={() => onDelete(id)}
            ></i>
          </OverlayTrigger>
        </Col>
      </Row>
      <hr className="m-0" />
      <div>
        <b>Email:</b> {email}
      </div>
      <div>
        <b>Username:</b> {username}
      </div>
      <div>
        <b>Password:</b> {password}
      </div>
      <div>
        <b>Phone Number:</b> {phoneNumber}
      </div>
      <div>
        <b>Status:</b> {campaignStatus}
      </div>
      <div>
        <b>Sales:</b> {sales}
      </div>
    </React.Fragment>
  );
};

export default PoshUserBody;
