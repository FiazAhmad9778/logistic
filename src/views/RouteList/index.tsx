import { Card, Col, Form, Row } from 'react-bootstrap';
import RouteTable from './RouteTable/RouteList';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { useDialogState } from '@/hooks/useDialogState';
import AssignClientDialog from './AssignDriverDialog/AssignDriverDialog';

const RouteList = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const { selectedRouteIds } = useAppSelector((state) => state['route']);
  const navigate = useNavigate();
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <div className="d-flex gap-2">
                {selectedRouteIds.length > 0 && (
                  <Button
                    btnType="btn-outline-primary"
                    icon={<i className="fa fa fa-plus"></i>}
                    onClick={setOpenDialog}
                  >
                    {'Assign Driver'}
                  </Button>
                )}
                <Button
                  btnType="btn-outline-primary"
                  icon={<i className="fa fa fa-plus"></i>}
                  onClick={() => navigate('/route-list/add-route')}
                >
                  {'New Route'}
                </Button>
              </div>
            </div>
            <AssignClientDialog isOpen={isOpen} setCloseDialog={setCloseDialog} />
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
