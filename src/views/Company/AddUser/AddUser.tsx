import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { HandleNotification } from '@/components/Toast';
import { yupResolver } from '@hookform/resolvers/yup';
import AddUserForm from './AddUserForm';
import { addUserResolver } from 'src/form-resolver/add-user-resolver';
import { useSaveUserMutation } from '@/infrastructure/store/api/company/company-api';
import { CreateUserRequest } from '@/infrastructure/store/api/company/company-types';
import { useRoleListingQuery } from '@/infrastructure/store/api/user-previleges/user-privileges-api';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
const AddUser = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(addUserResolver),
  });
  const navigate = useNavigate();
  const { data: roleListing } = useRoleListingQuery(null);
  const { data: clientListing } = useClientListQuery(null);
  const [saveUser, saveUserState] = useSaveUserMutation();
  const onSubmitUser: SubmitHandler<FieldValues> = async (e) => {
    const res = await saveUser(e as CreateUserRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/company-users', { replace: true });
      HandleNotification(res.message || 'User added successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Add User</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            <AddUserForm
              useFormReturn={useFormReturn}
              onSubmit={onSubmitUser}
              loadingState={saveUserState.isLoading}
              roles={roleListing?.data}
              clients={clientListing?.data}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddUser;
