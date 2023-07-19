import Button from '@/components/Button';
import Form from '@/components/Form';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface IDriverForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}

const DriverForm: React.FC<IDriverForm> = ({ useFormReturn, onSubmit, loadingState }) => {
  const { data: clientListing } = useClientListQuery(null);
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="First Name" name="firstName" placeholder="Enter first name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Last Name" name="lastName" placeholder="Enter last name" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Driver Id" name="driverId" placeholder="Enter unique driver Id" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Email" name="email" placeholder="Enter email" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Mobile" name="phoneNumber" placeholder="Enter mobile" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select
                label="Client"
                name="clientIds"
                isMulti
                options={clientListing?.data.map((option: any) => ({
                  name: option.name,
                  value: option.id,
                }))}
              />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default DriverForm;
