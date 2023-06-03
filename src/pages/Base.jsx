import { Outlet } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import Navbar from '../components/navbar';
import { useGlobalStore } from '../store';
import Alert from '../components/alert';
import useAuthenticated from '../helpers/hooks/useAuthenticated';

function Base() {
  const isAuthenticated = useAuthenticated(state => state.currentUser);
  const {
    alertIsOpen, closeAlert, severity, message, // onlinePolling, online,
  } = useGlobalStore(state => state, shallow);

  // useEffect(() => {
  //   if (!online) {
  //     onlinePolling();
  //   }
  // }, [online]);

  return (
    <main>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <Alert
        open={alertIsOpen}
        handleClose={closeAlert}
        severity={severity}
      >
        {message}
      </Alert>
    </main>
  );
}

export default Base;
