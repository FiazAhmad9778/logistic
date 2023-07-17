import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { HandleNotification } from '@/components/Toast';
import { useSaveOrderInstructionsMutation } from '@/infrastructure/store/api/order/order-api';
import { OrderInstructionsRequest } from '@/infrastructure/store/api/order/order-types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
interface IAddOrderInstructionProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AddOrderInstructionDialog: React.FC<IAddOrderInstructionProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  const [saveOrderInstructions, saveOrderInstructionsState] = useSaveOrderInstructionsMutation();

  const onSubmitOrderInstructions: SubmitHandler<FieldValues> = async (data) => {
    const res = await saveOrderInstructions(data as OrderInstructionsRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      setCloseDialog();
      HandleNotification(res.message || 'Order instructions added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <div>
      <Dialog title="Add Instructions to Orders" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={onSubmitOrderInstructions}>
          <Form.Textarea
            rows={5}
            label="Order Instructions"
            name="instruction"
            placeholder="(Maximum 200 characters)"
          />
          <div className="d-flex justify-content-end gap-2 mt-4 mb-2">
            <Button type="button" btnType="btn-outline-danger" btnSize="btn-sm" onClick={setCloseDialog}>
              Cancel
            </Button>
            <Button
              btnSize="btn-sm"
              loaderSize={8}
              loading={saveOrderInstructionsState.isLoading}
              disabled={saveOrderInstructionsState.isLoading}
            >
              Save
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default AddOrderInstructionDialog;
