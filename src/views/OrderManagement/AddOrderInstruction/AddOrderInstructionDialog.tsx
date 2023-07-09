import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { useForm } from 'react-hook-form';

interface IAddOrderInstructionProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AddOrderInstructionDialog: React.FC<IAddOrderInstructionProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  return (
    <div>
      <Dialog title="Add Instructions to Orders" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
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
            <Button btnSize="btn-sm">Save</Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default AddOrderInstructionDialog;
