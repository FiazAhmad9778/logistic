import { Row, Col, Card } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { HandleNotification } from '@/components/Toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUserResolver } from 'src/form-resolver/add-user-resolver';
import { useUpdateUserMutation, useUserByIdQuery } from '@/infrastructure/store/api/company/company-api';
import { UpdateUserRequest } from '@/infrastructure/store/api/company/company-types';
import EditUserForm from './EditUserForm';
import { useRoleListingQuery } from '@/infrastructure/store/api/user-previleges/user-privileges-api';
import { useClientListQuery } from '@/infrastructure/store/api/client/client-api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import Loader from '@/components/Loader';

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user, isLoading: IsUserLoading } = useUserByIdQuery(location.state?.userId ?? skipToken);
  const useFormReturn = useForm({
    resolver: yupResolver(addUserResolver),
    defaultValues: user?.data,
  });
  const { data: roleListing } = useRoleListingQuery(null);
  const { data: clientListing } = useClientListQuery(null);
  const [updateUser, updateUserState] = useUpdateUserMutation();
  const onSubmitUser: SubmitHandler<FieldValues> = async (e) => {
    const res = await updateUser(e as UpdateUserRequest).unwrap();

    if ('validationErrors' in res && res.isSuccess) {
      res?.validationErrors?.map((error) => useFormReturn.setError(error?.name as never, { message: error.message }));
    }

    if (res.success === true) {
      navigate('/company-users', { replace: true });
      HandleNotification(res.message || 'User updated successfully.', res.success);
    } else {
      HandleNotification(res.message || res?.errors[0], res.success);
    }
  };

  useEffect(() => {
    if (user) {
      useFormReturn.reset(user.data);
    }
  }, [user, useFormReturn]);

  const loading = IsUserLoading;
  return (
    <Row>
      <Col sm={12} className="col-12">
        <Card className="card-primary">
          <Card.Header>
            <div className="d-flex justify-content-between mb-2">
              <h4 className="card-title">Edit User</h4>
              <Button btnType="btn-outline-primary" btnSize="btn-sm" onClick={() => navigate(-1)}>
                {'Back'}
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="pt-0">
            {loading ? (
              <Loader />
            ) : (
              <EditUserForm
                useFormReturn={useFormReturn}
                onSubmit={onSubmitUser}
                loadingState={updateUserState.isLoading}
                roles={roleListing?.data}
                clients={clientListing?.data}
              />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditUser;
