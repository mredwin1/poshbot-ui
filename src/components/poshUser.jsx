import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

class PoshUser extends Component {
  handleImgClick = (url) => {
    window.open(url);
  };

  render() {
    const {
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
    } = this.props;
    const poshUserClosetUrl = `https://poshmark.com/closet/${username}`;

    return (
      <div className="mb-3">
        <Card className="card">
          <Card.Img
            variant="top"
            src={profilePictureUrl}
            style={{ cursor: 'pointer' }}
            onClick={() => this.handleImgClick(poshUserClosetUrl)}
          ></Card.Img>
          <Card.Body>
            <Row
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Col>
                <h5 className="card-title">
                  {firstName} {lastName}
                </h5>
              </Col>
              <Col xs={2}>
                <i
                  className="bi bi-trash"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDelete(id)}
                ></i>
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
      </div>
    );
  }
}

export default PoshUser;
