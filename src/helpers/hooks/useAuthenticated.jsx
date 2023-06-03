import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';
import { useAuthStore } from '../../store';

function useAuthenticated() {
  const { token, getCurrentUser, currentUser } = useAuthStore((state) => state, shallow);

  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [getCurrentUser, token]);

  return !!currentUser;
}

export default useAuthenticated;
