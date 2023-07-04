import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import Form from '@/components/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UploadDriver = () => {
  const useFormReturn = useForm();
  const breadcrumbPath = [
    {
      name: 'Driver Management',
      path: '/drivers',
      active: false,
    },
    {
      name: 'Upload Driver',
      path: '/drivers/bulk-upload-driver',
      active: true,
    },
  ];
  return (
    <Row>
      <Col md={12}>
        <Breadcrumb
          breadcrumbPath={breadcrumbPath}
          button={
            <Button type="button" btnType="btn-outline-primary">
              Export Drivers
            </Button>
          }
        />
      </Col>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <h4 className="card-title">Bulk Upload Driver</h4>
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
