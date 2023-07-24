import Button from '@/components/Button';
import Form from '@/components/Form';
import { ClientResponse } from '@/infrastructure/store/api/client/client-types';
import { RouteResponse } from '@/infrastructure/store/api/route/route-types';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface IAddOrderForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  routes?: RouteResponse[];
  clients?: ClientResponse[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}
const AddOrderForm: React.FC<IAddOrderForm> = ({ useFormReturn, onSubmit, routes, clients, loadingState }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select
                label="Route"
                name="routeId"
                options={routes?.map((option) => ({
                  value: option.id,
                  name: option.routeName,
                }))}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select
                label="Client"
                name="clientId"
                options={clients?.map((option) => ({
                  value: option.id,
                  name: option.name,
                }))}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input
                label="Unique Reference Code"
                name="uniqueReferenceCode"
                placeholder="Enter unique reference code"
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Order Name" name="orderName" placeholder="Enter order name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Name" name="customerName" placeholder="Enter customer name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Email" name="customerEmail" placeholder="Enter customer email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Customer Mobile" name="customerMobile" placeholder="Enter customer mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Town/City" name="townCity" placeholder="Enter town/city" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Post Code" name="postCode" placeholder="Enter post code" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Country" name="country" placeholder="Enter country" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Order Window Open" name="orderWindowOpen" type="time" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Order Window Close" name="orderWindowClose" type="time" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Type Of Order" name="typeOfOrder" placeholder="Enter type of order" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Loading Depot/Unit" name="loadingUnit" placeholder="Enter loading depot" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Product Weight (Kg)" name="productWeight" placeholder="Enter product weight" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Vehicle Type" name="vehicleType" placeholder="Enter vehicle type" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Temperature" name="temperature" placeholder="Enter temperature" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" placeholder="Enter address" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea
                label="Driver Delivery Instruction"
                name="deliveryInstruction"
                placeholder="Enter delivery instruction"
              />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState} disabled={loadingState}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddOrderForm;
