import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';

class CustomCard extends Component {
  handleImgClick = (url) => {
    window.open(url);
  };

  render() {
    const { children, imgSrc, imgUrl } = this.props;
    return (
      <Col>
        <Card className="mb-3">
          <Card.Img
            variant="top"
            src={imgSrc}
            style={imgUrl ? { cursor: 'pointer' } : {}}
            onClick={() => this.handleImgClick(imgUrl)}
          ></Card.Img>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Col>
    );
  }
}

export default CustomCard;
