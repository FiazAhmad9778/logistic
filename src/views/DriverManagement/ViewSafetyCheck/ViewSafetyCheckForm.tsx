import Form from '@/components/Form';
import { SafetyCheckResponse } from '@/infrastructure/store/api/driver/driver-types';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface ISafetyCheckForm {
  safetyCheck?: SafetyCheckResponse[];
}
const ViewSafetyCheckForm: React.FC<ISafetyCheckForm> = ({ safetyCheck }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={() => console.log()}>
          <Row>
            {safetyCheck?.map((field, index) => (
              <React.Fragment key={index}>
                <Col xl={6} lg={6} md={6} sm={12}>
                  <Form.Checkbox label={field.checkName} name={field.checkName} checked={field.checkActive} disabled />
                </Col>
              </React.Fragment>
            ))}
            <Col xl={6} lg={6} md={6} sm={12} className="d-flex align-items-center">
              <div>
                <span className="tx-12 tx-gray-600 tx-medium pe-3">Updated on Date:</span>
                <span>15/6/2023 17:49:48</span>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ViewSafetyCheckForm;
