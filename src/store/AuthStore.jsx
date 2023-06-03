import { create } from 'zustand';
import client from '../helpers/client';
import useGlobalStore from './GlobalStore';

const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('token'),
  currentUser: null,
  getCurrentUser: async () => {
    try {
      set({ loading: true });
      const response = await client.get('/current_user');
      if (response.status === 200) {
        set({ currentUser: response.data });
        return true;
      }
      return false;
    } catch (e) {
      if (e.code === 'ERR_NETWORK') {
        useGlobalStore.setState({ online: false });
      }
      if (e.response?.status === 401) {
        localStorage.removeItem('token');
        set({ token: null });
      }
      return false;
    }
  },
  signIn: async (data) => {
    try {
      const response = await client.post('/token', data);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        set({ token: response.data.access_token });
        const isSuccess = await get().getCurrentUser();
        return [isSuccess];
      }
      return [false, 'Service is unavailable right now.'];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.response);
      if (e.response?.status === 403) {
        return [false, 'Invalid username or password.'];
      }
      return [false, 'Service is unavailable right now.'];
    }
  },
  signUp: async (data) => {
    try {
      const response = await client.post('/signup', data);
      if (response.status === 200) {
        const [isSuccess, error] = await get().signIn(data);
        return [isSuccess, error];
      }
      return [false, 'Service is unavailable right now.'];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.response);
      if (e.response?.status === 503) {
        return [false, 'Such user with email or username already exists.'];
      }
      return [false, 'Service is unavailable right now.'];
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, currentUser: null });
  },
}));

export default useAuthStore;
