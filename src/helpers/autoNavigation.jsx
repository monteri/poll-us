import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthStore, useGlobalStore } from '../store';
import Loader from '../components/loader';

export const withAuth = (Component) => {
  function AuthenticatedComponent(props) {
    const currentUser = useAuthStore(state => state.currentUser);
    const token = useAuthStore(state => state.token);
    const showAlert = useGlobalStore(state => state.showAlert);
    const alertIsOpen = useGlobalStore(state => state.alertIsOpen);

    useEffect(() => {
      if (!token && !currentUser && !alertIsOpen) {
        showAlert('error', 'You need to be logged in to see this page.');
      }
    }, [token, currentUser, alertIsOpen]);

    if (token && !currentUser) {
      return <Loader />;
    }

    return currentUser ? <Component {...props} /> : <Navigate to="/sign_in" replace />;
  }

  return AuthenticatedComponent;
};

export const withoutAuth = (Component) => {
  function UnauthenticatedComponent(props) {
    const currentUser = useAuthStore(state => state.currentUser);
    const showAlert = useGlobalStore(state => state.showAlert);
    const alertIsOpen = useGlobalStore(state => state.alertIsOpen);

    useEffect(() => {
      if (currentUser && !alertIsOpen) {
        showAlert('info', 'You are already logged in.');
      }
    }, [currentUser, alertIsOpen]);

    return currentUser ? <Navigate to="/dashboard" replace /> : <Component {...props} />;
  }

  return UnauthenticatedComponent;
};
