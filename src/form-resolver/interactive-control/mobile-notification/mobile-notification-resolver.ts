import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number().typeError('Client is required!'),
  title: yup.string().required('Title is required!'),
  description: yup.string().required('Description is required!'),
  message: yup.string().required('Message is required!'),
  type: yup.string().required('Type is required!'),
};

export const addNotificationResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  title: genericResolver.title,
  description: genericResolver.description,
  message: genericResolver.message,
  type: genericResolver.type,
});
