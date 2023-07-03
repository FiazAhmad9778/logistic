import * as yup from 'yup';
export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  to: string | string[];
}

export const createUserResolver = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
  mobile: yup.string().required('Mobile is required!'),
  role: yup.string().required('Role is required!'),
  to: yup.array().of(yup.string().required('To is required!')).required('To is required!'),
});
