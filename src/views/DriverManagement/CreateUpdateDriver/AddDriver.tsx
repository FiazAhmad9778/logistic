import Button from '@/components/Button';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import DriverForm from './DriverForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const AddDriver = () => {
  const navigate = useNavigate();

  const onSubmitUser: SubmitHandler<FieldValues> = (e) => {
    console.log(e);
  };
  const breadcrumbPath = [
    {
      name: 'Driver Management',
      path: '/drivers',
      active: false,
    },
    {
      name: 'Create Driver',
      path: '/drivers/create-driver',
      active: true,
    },
  ];
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb
          breadcrumbPath={breadcrumbPath}
          button={
            <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
              {'Back'}
            </Button>
          }
        />
      </Col>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <h4 className="card-title">Add Driver</h4>
          </Card.Header>
          <Card.Body className="pt-0">
            <DriverForm onSubmitUser={onSubmitUser} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddDriver;
