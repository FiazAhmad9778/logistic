import * as yup from 'yup';

const genericResolver = {
  checkName: yup.string().required('Check name is required!'),
  checkDescription: yup.string().required('Description is required!'),
  fieldType: yup.string().required('Field type is required!'),
  checkActive: yup.boolean(),
  isNumberOnly: yup.boolean(),
  isMajorFault: yup.boolean(),
};

export const addSafetyCheckResolver = yup.object().shape({
  checkName: genericResolver.checkName,
  checkDescription: genericResolver.checkDescription,
  fieldType: genericResolver.fieldType,
  checkActive: genericResolver.checkActive,
  isNumberOnly: genericResolver.isNumberOnly,
  isMajorFault: genericResolver.isMajorFault,
});
