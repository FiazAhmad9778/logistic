import React, { useEffect } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordResolver } from 'src/form-resolver/auth-resolver';
import { useResetPasswordMutation, useVerifyTokenMutation } from '@/infrastructure/store/api/auth/auth-api';
import { HandleNotification } from '@/components/Toast';
import { Alert } from 'react-bootstrap';

const ResetPassword = () => {
  const useFormReturn = useForm({
    resolver: yupResolver(ResetPasswordResolver),
  });
  const navigate = useNavigate();

  const [setNewPassword, state] = useResetPasswordMutation();
  const [verifyToken, verifyTokenState] = useVerifyTokenMutation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('resetToken');

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    const payload = {
      token: '',
      password: e.newPassword,
    };
    await setNewPassword(payload)
      .unwrap()
      .then((res) => {
        HandleNotification(res.message, res.success);
        navigate('/auth/login');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(resetToken);
    resetToken &&
      verifyToken({ token: resetToken })
        .unwrap()
        .then((res) => {
          if (!res.success) {
            HandleNotification('Invalid Token provided', false);
          }
        })
        .catch((err) => console.log(err));
  }, [resetToken, verifyToken]);

  // Display different content based on token verification
  if (verifyTokenState.isLoading) {
    return <p>Loading...</p>; // Show a loading indicator while verifying the token
  }

  if (verifyTokenState.isError || !verifyTokenState.data?.success) {
    return (
      <React.Fragment>
        <Alert variant="" className="alert alert-warning text-center mt-3 py-2">
          <span className="text-red tx-medium">Invalid Token provided</span>
        </Alert>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/auth/login" className="text-primary tx-medium">
            <i className="fa fa-angle-left"></i> Back To Login
          </Link>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h4>Create New Password</h4>
      <p className="mb-5 mt-4">{'Your new password must be different from previous used passwords.'}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
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
