import Form from '@/components/Form';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface ISafetyCheckForm {
  viewSafetyCheck: unknown;
}
const ViewSafetyCheckForm: React.FC<ISafetyCheckForm> = ({ viewSafetyCheck }) => {
  const useFormReturn = useForm({
    defaultValues: {
      DriverName: 'Dennis',
      Brakes: true,
      Mirrors: true,
      SeatBelts: true,
      Lights: true,
      Fluids: true,
      BodyWork: true,
      MIleage: true,
      WindscreenFunctionality: true,
    },
  });
  console.log(viewSafetyCheck);
  return (
    <Row>
      <Col md={{ span: 6, offset: 1 }}>
        <Form useFormReturn={useFormReturn} onSubmit={() => console.log()}>
          <Row>
            {ViewSafetyCheckList.map((field, index) => (
              <React.Fragment key={index}>
                {field.type === 'Input' ? (
                  <Col xl={12} lg={12} md={12} sm={12}>
                    <Form.Input label={field.label} name={field.safetyCheckName} disabled />
                  </Col>
                ) : (
                  <Col xl={6} lg={6} md={6} sm={12}>
                    <Form.Checkbox label={field.label} name={field.safetyCheckName} disabled />
                  </Col>
                )}
              </React.Fragment>
            ))}
            <Col xl={6} lg={6} md={6} sm={12}>
              <div>
                <span className="tx-12 tx-gray-600 tx-medium pe-3">Updated on Date:</span>
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

const ViewSafetyCheckList = [
  {
    label: 'Driver Name',
    safetyCheckName: 'DriverName',
    type: 'Input',
  },
  {
    label: 'Brakes',
    safetyCheckName: 'Brakes',
    type: 'Checkbox',
  },
  {
    label: 'Mirrors',
    safetyCheckName: 'Mirrors',
    type: 'Checkbox',
  },
  {
    label: 'Seat Belts',
    safetyCheckName: 'SeatBelts',
    type: 'Checkbox',
  },
  {
    label: 'Seats Position',
    safetyCheckName: 'Seats Position',
    type: 'Checkbox',
  },
  {
    label: 'Vehicle refrigerator/inverter',
    safetyCheckName: 'VehicleRefrigerator',
    type: 'Checkbox',
  },
  {
    label: 'Vehicle Cleanliness',
    safetyCheckName: 'VehicleCleanliness',
    type: 'Checkbox',
  },
  {
    label: 'Vehicle Dashboard',
    safetyCheckName: 'VehicleDashboard',
    type: 'Checkbox',
  },
  {
    label: 'Windscreen Functionality',
    safetyCheckName: 'WindscreenFunctionality',
    type: 'Checkbox',
  },
  {
    label: 'Lights',
    safetyCheckName: 'Lights',
    type: 'Checkbox',
  },
  {
    label: 'Fluids',
    safetyCheckName: 'Fluids',
    type: 'Checkbox',
  },
  {
    label: 'Tyres And Wheels',
    safetyCheckName: 'TyresAndWheels',
    type: 'Checkbox',
  },
  {
    label: 'Windscreen Damage',
    safetyCheckName: 'WindscreenDamage',
    type: 'Checkbox',
  },
  {
    label: 'Body Work',
    safetyCheckName: 'BodyWork',
    type: 'Checkbox',
  },
  {
    label: 'Number Plates',
    safetyCheckName: 'NumberPlates',
    type: 'Checkbox',
  },
  {
    label: 'Vehicle Doors',
    safetyCheckName: 'VehicleDoors',
    type: 'Checkbox',
  },
  {
    label: 'Vehicle Registration Number',
    safetyCheckName: 'VehicleRegistrationNumber',
    type: 'Checkbox',
  },
  {
    label: 'MIleage',
    safetyCheckName: 'MIleage',
    type: 'Checkbox',
  },
  {
    label: 'Confirming I have completed the vehicle check and I am ready to start work',
    safetyCheckName: 'readyToStart',
    type: 'Checkbox',
  },
  {
    label: 'PPE Safety Equipment',
    safetyCheckName: 'PPESafetyEquipment',
    type: 'Checkbox',
  },
];
