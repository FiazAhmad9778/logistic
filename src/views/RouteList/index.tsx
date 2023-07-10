import { Card, Col, Form, Row } from 'react-bootstrap';
import RouteTable from './RouteTable/RouteList';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const RouteList = () => {
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
                onClick={() => navigate('/route-list/add-route')}
              >
                {'New Route'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <RouteTable />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RouteList;
