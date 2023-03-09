import React from 'react';
import addNotification from 'react-push-notification';
import { Button, Container } from 'react-bootstrap';

const Notify = () => {
  const testNotification = () => {
    addNotification({
      title: 'Test',
      message: 'This is a test',
      duration: 1000 * 60 * 60,
      native: true,
    });
  };

  return (
    <Container>
      <h2>Test if notifications work here</h2>
      <Button onClick={testNotification}>Click me</Button>
    </Container>
  );
};

export default Notify;
