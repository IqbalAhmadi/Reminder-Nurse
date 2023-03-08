import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';

const Time = ({ data, handleChange, handleRemove }) => {
  return (
    <li className="d-flex medTime">
      <Form.Control
        required
        type="time"
        name="times"
        className="form-input"
        onChange={(e) => {
          handleChange(e, data.index);
        }}
        defaultValue={data.time}
      ></Form.Control>
      {data.index !== 0 ? (
        <button
          type="button"
          className="fa-xs MedToggleB"
          aria-label="Close"
          onClick={(e) => handleRemove()}
        >
          <FontAwesomeIcon icon={faCalendarXmark} className="MedFAIcon" />
        </button>
      ) : null}
    </li>
  );
};

export default Time;
