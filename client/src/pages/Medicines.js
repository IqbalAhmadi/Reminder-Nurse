import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import MedicationList from '../components/MedicationList';
import { Container, Button, ButtonGroup, Tab, Tabs } from 'react-bootstrap';

const Medicines = () => {
  const { loading, data } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Container>
      <Button>Add Medication</Button>
      <section className="medicines">
        <Tabs defaultActiveKey="active" id="active-inactive-medication" justify>
          <Tab eventKey="active" title="Active Medication">
            <MedicationList medicines={data.medicines} isActive={true} />
          </Tab>
          <Tab eventKey="inactive" title="Inactive Medication">
            <MedicationList medicines={data.medicines} isActive={false} />
          </Tab>
        </Tabs>
      </section>
    </Container>
  );
};

export default Medicines;
