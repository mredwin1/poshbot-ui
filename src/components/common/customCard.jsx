import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';

class CustomCard extends Component {
  handleImgClick = (url) => {
    window.open(url);
  };

  render() {
    const { children, imgSrc, imgUrl, ribbonText } = this.props;
    return (
      <Col className="mb-3">
        <Card>
          {ribbonText ? (
            <span className="ribbon">Recent Sale</span>
          ) : (
            <span></span>
          )}
          <Card.Img
            variant="top"
            src={imgSrc}
            style={imgUrl ? { cursor: 'pointer' } : {}}
            onClick={imgUrl ? () => this.handleImgClick(imgUrl) : null}
          ></Card.Img>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Col>
    );
  }
}

export default CustomCard;
