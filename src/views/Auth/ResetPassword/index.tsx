import React from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordResolver } from 'src/form-resolver/auth-resolver';
import { useChangePasswordMutation } from '@/infrastructure/store/api/auth/auth-api';
import { HandleNotification } from '@/components/Toast';

const ResetPassword = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(ResetPasswordResolver),
  });
  const navigate = useNavigate();

  // const [saveNewPassword] = useResetPasswordMutation();
  const [saveNewPassword, state] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    const payload = {
      currentPassword: e.currentPassword,
      newPassword: e.newPassword,
    };
    await saveNewPassword(payload)
      .unwrap()
      .then((res) => {
        HandleNotification(res.message, res.success);
        navigate('/auth/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <h4>Create New Password</h4>
      <p className="mb-5 mt-4">{'Your new password must be different from previous used passwords.'}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          type="password"
          label="Current Password"
          name="currentPassword"
          placeholder="Please enter your current password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <Form.Input
          type="password"
          label="New Password"
          name="newPassword"
          placeholder="Please enter new password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Please enter confirm password"
          leading={<i className="fa fa-unlock"></i>}
        />
        <Button className="btn-block mt-3" type="submit" isLoading={state.isLoading}>
          Reset Password
        </Button>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/auth/login" className="text-primary tx-medium">
            <i className="fa fa-angle-left"></i> Back To Login
          </Link>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default ResetPassword;
