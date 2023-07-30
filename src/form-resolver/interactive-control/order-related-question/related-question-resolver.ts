import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number().typeError('Client is required!'),
  question: yup.string().required('Question is required!'),
  description: yup.string().required('Description is required!'),
  orderTypeId: yup.number().typeError('Order Type is required!').required('Order Type is required!'),
  questionTypeId: yup.number().typeError('Question Type is required!').required('Question Type is required!'),
};

export const addQuestionResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  question: genericResolver.question,
  description: genericResolver.description,
  orderTypeId: genericResolver.orderTypeId,
  questionTypeId: genericResolver.questionTypeId,
});
