import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DriverList from './DriverList/DriverList';

const DriverManagement = () => {
  const navigate = useNavigate();
  const breadcrumbPath = [
    {
      name: 'Driver Management',
      path: '/drivers',
      active: true,
    },
  ];
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb
          breadcrumbPath={breadcrumbPath}
          button={
            <Button
              btnType="btn-outline-primary"
              icon={<i className="fa fa fa-plus"></i>}
              onClick={() => navigate('/drivers/create-driver')}
            >
              {'New Record'}
            </Button>
          }
        />
      </Col>
      <DriverList />
    </Row>
  );
};

export default DriverManagement;
