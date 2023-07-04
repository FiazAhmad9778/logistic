import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/infrastructure/store/api/auth/auth-api';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { setAuth } from '@/infrastructure/store/features/auth/auth-slice';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { LoginPayload } from '@/infrastructure/store/api/auth/auth-types';

const Login = () => {
  const useFormReturn = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginAPi, state] = useLoginMutation({});

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    if (state.isLoading) return;

    const res = await loginAPi(e as LoginPayload);

    if ('error' in res && 'data' in res.error) {
      return;
    }

    if (!('error' in res)) {
      dispatch(setAuth(res.data.data));
      navigate('/', { replace: true });
    }
  };

  return (
    <React.Fragment>
      <h4>Welcome Back</h4>
      <p className="mb-5">Please enter your email and password</p>
      <p className="mb-5">{"Enter your email and we'll send you instructions to reset your password"}</p>
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit}>
        <Form.Input
          label="Email"
          name="email"
          placeholder="Please enter your email"
          leading={<i className="far fa-envelope"></i>}
        />
        <div className="position-relative">
          <Form.Input
            type="password"
            label="Password"
            name="password"
            placeholder="Please enter your password"
            leading={<i className="fa fa-unlock"></i>}
          />
          <Link to="/auth/forget-password" className="text-primary tx-medium position-absolute top-0 end-0">
            Forget Password?
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Checkbox label="Remember me" name="remember" />
          <Link to="/auth/reset-password" className="text-primary tx-medium">
            Reset Password?
          </Link>
        </div>
        <Button className="btn-block mt-3" type="submit">
          SIGN IN
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default Login;
