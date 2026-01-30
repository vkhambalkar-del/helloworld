import { createBrowserRouter } from 'react-router-dom';
import { Hello } from '../pages/Hello';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Hello />,
  },
  {
    path: '/hello',
    element: <Hello />,
  },
]);
