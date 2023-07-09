import React, { useState } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordResolver } from 'src/form-resolver/auth-resolver';
import { useResetPasswordMutation } from '@/infrastructure/store/api/auth/auth-api';
import { HandleNotification } from '@/components/Toast';

const ResetPassword = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(ResetPasswordResolver),
  });
  const navigate = useNavigate();

  const [setNewPassword, setNewPasswordState] = useResetPasswordMutation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('resetToken');
  const [error, setError] = useState<string>('');

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    if (resetToken) {
      const payload = {
        token: resetToken,
        password: e.password,
      };
      const res = await setNewPassword(payload).unwrap();

      if (!('error' in res) && res.success === true) {
        HandleNotification('Password reset successfully.', res.success);
        navigate('/auth/login');
      } else {
        setError('Reset link expired!');
        return;
      }
    }
  };

  return (
    <React.Fragment>
      <h4>Create New Password</h4>
      <p className="mb-5 mt-4">{'Your new password must be different from previous used passwords.'}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          type="password"
          label="New Password"
          name="password"
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

        {error && <span className="text-danger tx-12">{error}</span>}

        <Button className="btn-block mt-3" type="submit" isLoading={setNewPasswordState.isLoading}>
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
