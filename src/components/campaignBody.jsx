import React, { Component } from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';

class CampaignBody extends Component {
  state = {};

  handleUserClick = (poshUser) => {
    window.open(poshUser.profile_url);
  };

  render() {
    const { title, id, status, poshUser, onDelete } = this.props;
    return (
      <>
        <Row>
          <Col>
            <span className="fs-6">{title}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span
              className="fs-6"
              style={poshUser ? { cursor: 'pointer' } : {}}
              onClick={
                poshUser
                  ? (poshUser) => this.handleUserClick(poshUser)
                  : () => {}
              }
            >
              Posh User: {poshUser ? poshUser.username : 'None Assigned'}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="fs-6">Status: {status}</span>
          </Col>
        </Row>
        <hr className="mb-0 mt-4" />
        <Row style={{ justifyContent: 'end' }} className="pt-1">
          <Col xs={2}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Stop Campaign</Tooltip>}
            >
              <i
                className="bi bi-stop"
                style={{ cursor: 'pointer', fontSize: '1.4rem' }}
                onClick={() => {}}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={2}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Start Campaign</Tooltip>}
            >
              <i
                className="bi bi-play"
                style={{ cursor: 'pointer', fontSize: '1.4rem' }}
                onClick={() => {}}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={2}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Edit Campaign</Tooltip>}
            >
              <i
                className="bi bi-pen"
                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                onClick={() => {}}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={2}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Delete Campaign</Tooltip>}
            >
              <i
                className="bi bi-trash"
                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                onClick={() => onDelete(id)}
              ></i>
            </OverlayTrigger>
          </Col>
        </Row>
      </>
    );
  }
}

export default CampaignBody;
