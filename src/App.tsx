import { useRoutes } from 'react-router-dom';
import { routes } from './infrastructure/appRoute/routes';

function App() {
  const AppRoutes = useRoutes(routes);

  return AppRoutes;
}

export default App;
