import Button from '@/components/Button';
import Form from '@/components/Form';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface IAddOrderForm {
  onSubmit: SubmitHandler<FieldValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}
const AddOrderForm: React.FC<IAddOrderForm> = ({ useFormReturn, onSubmit }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Input label="Start Depo" name="startDepo" placeholder="Enter start depo" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Name" name="customerName" placeholder="Enter customer name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Client Name" name="clientName" placeholder="Enter client name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Address" name="address" placeholder="Enter address name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Post Code" name="postCode" placeholder="Enter post code" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit">Save</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddOrderForm;
