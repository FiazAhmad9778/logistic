import * as yup from 'yup';

export const genericResolver = {
  clientId: yup.number().typeError('Client is required!'),
  question: yup.string().required('Question is required!'),
};

export const addSurveyQuestionResolver = yup.object().shape({
  clientId: genericResolver.clientId,
  question: genericResolver.question,
});
