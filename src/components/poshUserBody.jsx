import React from 'react';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

const PoshUserBody = (props) => {
  const {
    id,
    first_name,
    last_name,
    email,
    username,
    password,
    phone_number,
    status,
    sales,
    onDelete,
  } = props;
  return (
    <React.Fragment>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Col>
          <h5>
            {first_name} {last_name}
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
        <b>Username:</b> {username}
      </div>
      <div>
        <b>Password:</b> {password}
      </div>
      <div>
        <b>Status:</b> {status}
      </div>
      <div>
        <b>Phone Number:</b> {phone_number ? phone_number : 'None'}
      </div>
      <div>
        <b>Sales:</b> {sales}
      </div>
      <div>
        <b>Email:</b> {email ? email : 'None'}
      </div>
    </React.Fragment>
  );
};

export default PoshUserBody;
