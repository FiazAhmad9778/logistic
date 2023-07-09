import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IMileageProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const MileageDialog: React.FC<IMileageProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  return (
    <div>
      <Dialog title="Edit Mileage" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
          <Form.Input label="Vehicle Registration Number" name="vehicleRegistrationNumber" />
          <Form.Input label="Mileage" name="Mileage" />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button btnSize="btn-sm">Save</Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default MileageDialog;
