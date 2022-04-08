import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const AddButton = (props) => {
  const { message, onClick } = props;
  return (
    <div onClick={onClick}>
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
    </div>
  );
};

export default AddButton;
