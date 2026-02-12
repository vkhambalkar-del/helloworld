import { createBrowserRouter } from 'react-router';
import { Hello } from '../pages/Hello';
import { EmployeeList } from '../pages/EmployeeList';
import { UserList } from '../pages/UserList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Hello />,
  },
  {
    path: '/hello',
    element: <Hello />,
  },
  {
    path: '/employees',
    element: <EmployeeList />,
  },
  {
    path: '/users',
    element: <UserList />,
  },
]);
