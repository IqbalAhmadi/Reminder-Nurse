import React from 'react';
import { Form } from 'react-bootstrap';

const Time = ({ data, handleChange }) => {
  return (
    <li className="d-flex">
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
        <button type="button" className="btn-close" aria-label="Close"></button>
      ) : null}
    </li>
  );
};

export default Time;
