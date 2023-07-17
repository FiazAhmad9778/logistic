import * as yup from 'yup';

const genericResolver = {
  routeName: yup.string().required('Route name is required!'),
  routeStart: yup.string().required('Route start is required!'),
  routeDate: yup.string().required('Route date is required!'),
  project: yup.string().required('Project is required!'),
  profile: yup.string().required('Profile is required!'),
};

export const addRouteResolver = yup.object().shape({
  routeName: genericResolver.routeName,
  routeStart: genericResolver.routeStart,
});

export const addRouteAssignmentResolver = yup.object().shape({
  routeDate: genericResolver.routeDate,
  project: genericResolver.project,
  profile: genericResolver.profile,
});
