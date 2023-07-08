import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { useForgotPasswordMutation } from '@/infrastructure/store/api/auth/auth-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordResolver } from 'src/form-resolver/auth-resolver';
import { InfoMessage } from 'src/constant/info-messages';

const ForgotPassword = () => {
  const [infoMessage, setInfoMessage] = useState<string>();
  const useFormReturn = useForm({
    resolver: yupResolver(ForgotPasswordResolver),
  });

  const [saveForgotPassword, state] = useForgotPasswordMutation();
  const [error, setError] = useState<string>('');

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    const payload = {
      email: e.email,
      host: window.location.origin,
    };
    await saveForgotPassword(payload)
      .unwrap()
      .then((res) => {
        if (!('error' in res) && res.success === true) {
          useFormReturn.reset({ email: '' });
          setInfoMessage(InfoMessage.ResetPasswordLink);
        } else {
          setError('Account not found against provided email!');
          return;
        }
      })
      .catch((err) => console.log(err));
    console.log(payload);
  };

  return (
    <React.Fragment>
      <h4>
        Forgot Password? <i className="fa fa-unlock-alt tx-primary"></i>
      </h4>
      <p className="mb-2 mt-1">{"Enter your email and we'll send you instructions to reset your password"}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          label="Email"
          name="email"
          placeholder="Please enter your email"
          leading={<i className="far fa-envelope"></i>}
        />
        {error && <span className="text-danger tx-12">{error}</span>}
        {!infoMessage && (
          <Button className="btn-block mt-3" type="submit" loading={state.isLoading}>
            Send Reset Link
          </Button>
        )}
        {infoMessage && (
          <Alert variant="" className="alert alert-primary text-center mt-3 py-2">
            {infoMessage}
          </Alert>
        )}
        <div className="d-flex justify-content-center mt-4">
          <Link to="/auth/login" className="text-primary tx-medium">
            <i className="fa fa-angle-left"></i> Back To Login
          </Link>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default ForgotPassword;
