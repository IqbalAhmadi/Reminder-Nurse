import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import MedicationList from '../components/MedicationList';
import { Container, Button, Tab, Tabs } from 'react-bootstrap';
import rnStatic from '../assets/images/rn_static_01.png';
import rnStatic from '../assets/images/rn_static_01.png';

const Medicines = () => {
  const { loading, data, error } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;
  if (error) {
    console.log(error);
    return <h2>Error</h2>;
  }

  return (
    <div className="MedBottom">
      <h2 className="dmedHeader">Your Medications</h2>
      <center>
        <div className="row dTop">
          <div className="imgContain col-5">
            <img
              src={rnStatic}
              className="imgNurse"
              alt="Icon of the Reminder Nurse"
            />
          </div>
          <div className="col-5 animate__animated animate__fadeIn">
            <div className="card dailyDialogue border-0 shadow-sm">
              <div className="card-body">Need to edit your medications?</div>
            </div>
          </div>
        </div>
      </center>
      <Container className="container-fluid pl-4">
        <section className="medicines">
          <Tabs
            defaultActiveKey="active"
            id="active-inactive-medication"
            justify
          >
            <Tab eventKey="active" title="Active Medication">
              <MedicationList medicines={data.medicines} isActive={true} />
            </Tab>
            <Tab eventKey="inactive" title="Inactive Medication">
              <MedicationList medicines={data.medicines} isActive={false} />
            </Tab>
          </Tabs>
          <section className="d-flex flex-wrap justify-content-center">
            <Link to="../medicine/add">
              <Button
                className="form-submit-btn rounded-pill MedAddM"
                variant="primary"
                type="submit"
              >
                Add Medication
              </Button>
            </Link>
          </section>
        </section>
      </Container>
    </div>
  );
};

export default Medicines;
