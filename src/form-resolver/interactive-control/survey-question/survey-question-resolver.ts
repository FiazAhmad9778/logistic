import * as yup from 'yup';

export const genericResolver = {
  question: yup.string().required('Question is required!'),
};

export const addSurveyQuestionResolver = yup.object().shape({
  question: genericResolver.question,
});
