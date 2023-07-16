import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@/components/Button';
import ClientGroupList from './ClientGroupList/ClientGroupList';
import { useNavigate } from 'react-router-dom';
import PermissionWrapper from '@/components/Permission/permission-helper';
import { ClaimCode } from 'src/enums/claim-codes';

const ClientGroupManagement = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <PermissionWrapper requiredClaims={[ClaimCode.CGMA]}>
                <Button
                  btnType="btn-outline-primary"
                  icon={<i className="fa fa fa-plus"></i>}
                  onClick={() => navigate('/client-group-management/add-client-group')}
                >
                  {'New Client Group'}
                </Button>
              </PermissionWrapper>
            </div>
          </Card.Header>
          <Card.Body className="py-2">
            <ClientGroupList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ClientGroupManagement;
