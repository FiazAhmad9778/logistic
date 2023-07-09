import Button from '@/components/Button';
import Form from '@/components/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const UploadDriver = () => {
  const useFormReturn = useForm();
  const navigate = useNavigate();

  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Bulk Upload Driver</h4>
              <div className="d-flex gap-2">
                <Button type="button" btnSize="btn-sm" btnType="btn-outline-primary" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button type="button" btnSize="btn-sm" btnType="btn-outline-primary">
                  Export Drivers
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
              <Form.Input label="Upload Driver" name="file" type="file" />
              <div className="d-flex justify-content-end mt-4">
                <Button type="submit" btnType="btn-primary">
                  Save File
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UploadDriver;
