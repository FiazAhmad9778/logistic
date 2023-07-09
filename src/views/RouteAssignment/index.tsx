import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@/components/Button';
import RouteAssignmentList from './RouteAssignmentList/RouteAssignmentList';
import { useNavigate } from 'react-router-dom';

const RouteAssignment = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <Button
                btnType="btn-outline-primary"
                icon={<i className="fa fa fa-plus"></i>}
                onClick={() => navigate('/route-assignment-list/assign-route')}
              >
                New Record
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <RouteAssignmentList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RouteAssignment;
