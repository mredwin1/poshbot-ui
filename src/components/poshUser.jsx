import React from 'react';
import { Card, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';

const PoshUser = ({
  email,
  firstName,
  lastName,
  id,
  password,
  profilePictureUrl,
  sales,
  username,
  phoneNumber,
  campaignStatus,
  onDelete,
  onImgClick,
}) => {
  const poshUserClosetUrl = `https://poshmark.com/closet/${username}`;

  return (
    <Card className="card mb-3">
      <Card.Img
        variant="top"
        src={profilePictureUrl}
        style={{ cursor: 'pointer' }}
        onClick={() => onImgClick(poshUserClosetUrl)}
      ></Card.Img>
      <Card.Body>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Col>
            <h5 className="card-title">
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
      </Card.Body>
    </Card>
  );
};

export default PoshUser;
