import * as yup from 'yup';

export const userRoleResolver = yup.object().shape({
  roleName: yup.string().required('Role name is required!'),
});
