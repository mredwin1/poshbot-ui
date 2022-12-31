import React, { Component } from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';

class CampaignBody extends Component {
  state = {};

  handleUserClick = (poshUser) => {
    console.log(poshUser);
    window.open(poshUser.profile_url);
  };

  render() {
    const { title, id, status, poshUser, onDelete, onEdit, onStart, onStop } =
      this.props;

    console.log(poshUser);
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
          <Col xs={3}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Stop Campaign</Tooltip>}
            >
              <i
                className="bi bi-stop text-center"
                style={
                  status !== '3'
                    ? { cursor: 'pointer', fontSize: '1.4rem' }
                    : { fontSize: '1.4rem' }
                }
                onClick={() => (status !== '3' ? onStop(id) : {})}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={3}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Start Campaign</Tooltip>}
            >
              <i
                className="bi bi-play text-center"
                style={
                  status === '3'
                    ? { cursor: 'pointer', fontSize: '1.4rem' }
                    : { fontSize: '1.4rem' }
                }
                onClick={() => (status === '3' ? onStart(id) : {})}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={3}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Edit Campaign</Tooltip>}
            >
              <i
                className="bi bi-pen text-center"
                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                onClick={() => onEdit(id)}
              ></i>
            </OverlayTrigger>
          </Col>
          <Col xs={3}>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Delete Campaign</Tooltip>}
            >
              <i
                className="bi bi-trash text-center"
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
