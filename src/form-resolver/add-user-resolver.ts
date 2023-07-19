import * as yup from 'yup';

export const genericResolver = {
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
  phoneNumber: yup.string().required('Mobile is required!'),
  roleId: yup.number().typeError('Role is required!').required('Role is required!'),
};

export const addUserResolver = yup.object().shape({
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  email: genericResolver.email,
  phoneNumber: genericResolver.phoneNumber,
  roleId: genericResolver.roleId,
});
