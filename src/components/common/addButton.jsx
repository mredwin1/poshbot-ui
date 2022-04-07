import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const AddButton = (props) => {
  const { message } = props;
  return (
    <React.Fragment>
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={<Tooltip id={`tooltip-top`}>{message}</Tooltip>}
      >
        <i
          className="bi bi-plus-square"
          style={{ cursor: 'pointer', fontSize: '2rem' }}
        ></i>
      </OverlayTrigger>
    </React.Fragment>
  );
};

export default AddButton;
