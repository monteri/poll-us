import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  online: false,
  loading: false,
  setLoading: (value) => set({ loading: value }),
  alertIsOpen: false,
  severity: 'warning',
  message: '',
  closeAlert: () => set({ alertIsOpen: false }),
  showAlert: (severity, message) => {
    set({ alertIsOpen: true, severity, message });
  },
  onlinePolling: () => {
    const arr = [false, false, false, true, false, true];
    let i = 0;
    const interval = setInterval(() => {
      const res = arr[i];
      if (res) {
        clearInterval(interval);
        set({ online: true });
      }
      i += 1;
    }, 5000);
  },
}));

export default useGlobalStore;
