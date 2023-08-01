import Button from '@/components/Button';
import Form from '@/components/Form';
import { Row, Col, Card, Form as BForm } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ScheduleOrderList from './ScheduleOrdersList/ScheduleOrderList';

const Home = () => {
  const useFormReturn = useForm();

  const onSubmitFilter = () => console.log('data');
  return (
    <div>
      <Row>
        <Col xs={12} lg={12} xl={12} md={12}>
          <Form useFormReturn={useFormReturn} onSubmit={onSubmitFilter}>
            <Row className="mx-0 mb-4">
              <div className="col-11">
                <div className="row">
                  <div className="col-3">
                    <Form.Input label="Date" name="date" type="date" />
                  </div>
                  <div className="col-3">
                    <Form.Select label="Route" name="route" options={[]} />
                  </div>
                  <div className="col-3">
                    <Form.Select label="Driver" name="driver" options={[]} />
                  </div>
                  <div className="col-3">
                    <Form.Select label="Client" name="client" options={[]} />
                  </div>
                </div>
              </div>
              <div className="col-1 d-flex align-items-end mb-2">
                <Button type="submit">Search</Button>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="col-12">
          <Card className="card-primary">
            <Card.Header>
              <div className="d-flex justify-content-between mb-2">
                <BForm.Control className="form-control w-25 mb-0" placeholder="Search..." />
              </div>
            </Card.Header>
            <Card.Body className="pt-0">
              <ScheduleOrderList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
