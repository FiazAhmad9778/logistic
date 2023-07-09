import Button from '@/components/Button';
import { Col, Row, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DriverList from './DriverList/DriverList';

const DriverManagement = () => {
  const navigate = useNavigate();

  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <div>
                <Button
                  className="me-2"
                  btnType="btn-outline-primary"
                  icon={<i className="fa fa fa-plus"></i>}
                  onClick={() => navigate('/drivers/bulk-upload-driver')}
                >
                  {'Bulk Upload Driver'}
                </Button>
                <Button
                  btnType="btn-outline-primary"
                  icon={<i className="fa fa fa-plus"></i>}
                  onClick={() => navigate('/drivers/create-driver')}
                >
                  {'New Record'}
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <DriverList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DriverManagement;
