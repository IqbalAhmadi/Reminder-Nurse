import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import MedicationList from '../components/MedicationList';
import { Container, Button, Tab, Tabs } from 'react-bootstrap';

const Medicines = () => {
  const { loading, data } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Container>
      <section className="medicines">
        <Tabs defaultActiveKey="active" id="active-inactive-medication" justify>
          <Tab eventKey="active" title="Active Medication">
            <MedicationList medicines={data.medicines} isActive={true} />
          </Tab>
          <Tab eventKey="inactive" title="Inactive Medication">
            <MedicationList medicines={data.medicines} isActive={false} />
          </Tab>
        </Tabs>
        <section className='d-flex flex-wrap justify-content-center'>
          <Button className="form-submit-btn" variant="primary" type="submit">
            <Link to='../medicine/add'>Add Medication</Link>
          </Button>
          <Button className="form-submit-btn" variant="primary" type="submit">
            <Link to='../daily'>Go Back</Link>
          </Button>
        </section>
      </section>
    </Container>
  );
};

export default Medicines;
