import Button from '@/components/Button';
import Form from '@/components/Form';
import { DriverResponse } from '@/infrastructure/store/api/driver/driver-types';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { editDriverResolver } from 'src/form-resolver/driver/driver-resolver';

interface IEditDriverForm {
  onSubmit: SubmitHandler<FieldValues>;
  driver: DriverResponse;
  loadingState: boolean;
}

const EditDriverForm: React.FC<IEditDriverForm> = ({ onSubmit, driver, loadingState }) => {
  const useFormReturn = useForm({
    resolver: yupResolver(editDriverResolver),
    defaultValues: driver,
  });
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea label="Address" name="address" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Mark as Active" name="isActive" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState}>
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditDriverForm;
