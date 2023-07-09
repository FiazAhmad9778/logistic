import Button from '@/components/Button';
import Form from '@/components/Form';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface ISafetyCheckForm {
  onSubmit: SubmitHandler<FieldValues>;
}
const SafetyCheckForm: React.FC<ISafetyCheckForm> = ({ onSubmit }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Input label="Check Name" name="checkName" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Textarea rows={6} label="Vehicle Safety Check Description" name="vehicleSafetyCheckDescription" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Select label="Field Type" name="fieldType" options={[]} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Input label="Check Icon" name="checkIcon" type="file" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Checkbox label="Mark as Active" name="active" />
              <Form.Checkbox label="Is Only Numeric Value" name="isNumeric" />
              <Form.Checkbox label="Mark as Major fault" name="isMajorFault" />
            </Col>
            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button>Save</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default SafetyCheckForm;
