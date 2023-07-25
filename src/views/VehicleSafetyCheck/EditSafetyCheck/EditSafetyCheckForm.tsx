import Button from '@/components/Button';
import Form from '@/components/Form';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface ISafetyCheckForm {
  onSubmit: SubmitHandler<FieldValues>;
  loadingState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}
const EditSafetyCheckForm: React.FC<ISafetyCheckForm> = ({ onSubmit, useFormReturn, loadingState }) => {
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Input label="Check Name" name="checkName" placeholder="Enter check name" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea
                rows={6}
                label="Vehicle Safety Check Description"
                name="checkDescription"
                placeholder="Enter description"
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Field" name="fieldType" placeholder="Enter field type" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Check Icon" name="checkIcon" type="file" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Checkbox label="Mark as Active" name="checkActive" />
              <Form.Checkbox label="Is Only Numeric Value" name="isNumberOnly" />
              <Form.Checkbox label="Mark as Major fault" name="isMajorFault" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button type="submit" loading={loadingState} disabled={loadingState}>
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default EditSafetyCheckForm;
