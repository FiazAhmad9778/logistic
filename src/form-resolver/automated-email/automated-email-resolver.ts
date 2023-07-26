import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number(),
  email: yup.string().required('Email is required!'),
  sectionId: yup.number().typeError('Section is required!').required('Section is required!'),
};

export const addAutomatedEmailResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  email: genericResolver.email,
  sectionId: genericResolver.sectionId,
});

export const editAutomatedEmailResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  email: genericResolver.email,
  sectionId: genericResolver.sectionId,
});
