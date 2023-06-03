import {
  createBrowserRouter,
} from 'react-router-dom';
import Base from '../pages/Base';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Polls from '../pages/Polls';
import Error from '../pages/Error';
import CreatePoll from '../pages/CreatePoll';
import PollDetail from '../pages/PollDetail';

const routes = [
  {
    path: '/',
    element: <Base />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/sign_in',
        element: <SignIn />,
      },
      {
        path: '/sign_up',
        element: <SignUp />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/create_poll',
        element: <CreatePoll />,
      },
      {
        path: '/polls',
        element: <Polls />,
      },
      {
        path: '/polls/:id/edit',
        element: <div>Polls id Edit</div>,
      },
      {
        path: '/polls/:id/results',
        element: <div>Polls results</div>,
      },
      {
        path: '/polls/:id',
        element: <PollDetail />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
