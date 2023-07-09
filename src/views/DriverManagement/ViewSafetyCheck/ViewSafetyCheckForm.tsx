import Form from '@/components/Form';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

interface ISafetyCheckForm {
  onSubmitUser: SubmitHandler<FieldValues>;
}
const ViewSafetyCheckForm: React.FC<ISafetyCheckForm> = ({ onSubmitUser }) => {
  const useFormReturn = useForm();
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitUser}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Form.Input label="Driver Name" name="DriverName" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Brakes" name="Brakes" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Mirrors" name="Mirrors" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Seat Belts" name="SeatBelts" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Seats Position" name="SeatsPosition" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Vehicle refrigerator/inverter" name="VehicleRefrigerator" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Vehicle Cleanliness" name="VehicleCleanliness" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Vehicle Dashboard" name="VehicleDashboard" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Windscreen Functionality" name="WindscreenFunctionality" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Lights" name="Lights" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Fluids" name="Fluids" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Tyres and Wheels" name="TyresAndWheels" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Windscreen Damage" name="WindscreenDamage" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Bodywork" name="Bodywork" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Number Plates" name="NumberPlates" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Vehicle Doors" name="VehicleDoors" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="Vehicle Registration Number" name="VehicleRegistrationNumber" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="MIleage" name="active" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox
                label="Confirming I have completed the vehicle check and I am ready to start work"
                name="readyToStart"
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <Form.Checkbox label="PPE safety equipment" name="PPESafetyEquipment" />
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              <div>
                <span className="tx-12 tx-gray-600 tx-medium">Updated on Date:</span>
                <span>15/6/2023 17:49:48</span>
              </div>
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

export default ViewSafetyCheckForm;
