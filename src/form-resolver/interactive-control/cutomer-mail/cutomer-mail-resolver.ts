import * as yup from 'yup';

export const genericResolver = {
  subject: yup.string().required('Subject is required!'),
  body: yup.string().required('Body is required!'),
};

export const addCustomerMailResolver = yup.object().shape({
  subject: genericResolver.subject,
  body: genericResolver.body,
});
