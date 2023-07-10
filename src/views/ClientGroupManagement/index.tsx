import { Row, Col, Card, Form } from 'react-bootstrap';
import Button from '@/components/Button';
import ClientGroupList from './ClientGroupList/ClientGroupList';
import { useDialogState } from '@/hooks/useDialogState';
import AddClientGroupDialog from './AddClientGroupDialog/AddClientGroupDialog';

const ClientGroupManagement = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <Form.Control className="form-control w-25 mb-0" placeholder="Search..." />
              <Button
                btnType="btn-outline-primary"
                icon={<i className="fa fa fa-plus"></i>}
                onClick={() => setOpenDialog()}
              >
                {'New Client Group'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="py-2">
            <ClientGroupList />
          </Card.Body>
        </Card>
      </Col>
      <AddClientGroupDialog isOpen={isOpen} setCloseDialog={setCloseDialog} />
    </Row>
  );
};

export default ClientGroupManagement;
