import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { HandleNotification } from '@/components/Toast';
import { useUpdateMileageMutation } from '@/infrastructure/store/api/driver/driver-api';
import { MileageRequest } from '@/infrastructure/store/api/driver/driver-types';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IMileageProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const MileageDialog: React.FC<IMileageProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  const [saveMileage, saveMileageState] = useUpdateMileageMutation();

  const onSubmitMileage: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveMileage(data as MileageRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Mileage updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <div>
      <Dialog title="Edit Mileage" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitMileage}>
          <Form.Input label="Vehicle Registration Number" name="vehicleRegistrationNumber" />
          <Form.Input label="Mileage" name="Mileage" />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button
              btnSize="btn-sm"
              loaderSize={8}
              loading={saveMileageState.isLoading}
              disabled={saveMileageState.isLoading}
            >
              Save
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default MileageDialog;
