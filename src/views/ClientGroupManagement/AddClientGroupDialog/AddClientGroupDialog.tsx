import Button from '@/components/Button';
import Form from '@/components/Form';
import Dialog from '@/components/Modal';
import { useForm } from 'react-hook-form';

interface IAddClientGroupProps {
  isOpen: boolean;
  setCloseDialog: () => void;
}

const AddClientGroupDialog: React.FC<IAddClientGroupProps> = ({ isOpen, setCloseDialog }) => {
  const useFormReturn = useForm();
  return (
    <div>
      <Dialog title="Manage Client Group" show={isOpen} handleClose={setCloseDialog}>
        <Form useFormReturn={useFormReturn} onSubmit={(e) => console.log(e)}>
          <Form.Input label="Client Group Name" name="clientGroupName" />
          <Form.Checkbox label="Active" name="active" />
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

export default AddClientGroupDialog;
