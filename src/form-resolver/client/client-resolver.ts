import * as yup from 'yup';

const genericResolver = {
  clientName: yup.string().required('Client name is required!'),
  clientGroupName: yup.string().required('Client group name is required!'),
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
  address: yup.string().required('Address is required!'),
};

export const addClientResolver = yup.object().shape({
  clientName: genericResolver.clientName,
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  email: genericResolver.email,
  address: genericResolver.address,
});

export const addClientGroupResolver = yup.object().shape({
  clientName: genericResolver.clientName,
  clientGroupName: genericResolver.clientGroupName,
  firstName: genericResolver.firstName,
  lastName: genericResolver.lastName,
  email: genericResolver.email,
  address: genericResolver.address,
});
