import { create } from 'zustand';
import client from '../helpers/client';
import ApiCaseModel from '../helpers/models/ApiCaseModel';

const usePollStore = create((set) => ({
  polls: [],
  getMyPolls: async () => {
    try {
      const response = await client.get('/questions');
      if (response.status === 200) {
        const serializer = new ApiCaseModel(response.data);
        set({ polls: serializer.getCamel() });
        return [true];
      }
      return [false, 'Service is unavailable right now.'];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.response);
      return [false, 'Service is unavailable right now.'];
    }
  },
  getPoll: async (id) => {
    try {
      const response = await client.get(`/questions/${id}`);
      if (response.status === 200) {
        const serializer = new ApiCaseModel(response.data);
        return [serializer.getCamel()];
      }
      return [false, 'Service is unavailable right now.'];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.response);
      return [false, 'Service is unavailable right now.'];
    }
  },
  createPoll: async (data) => {
    try {
      const serializer = new ApiCaseModel(data);
      const response = await client.post('/questions', serializer.getSnake());
      if (response.status === 200) {
        return [true];
      }
      return [false, 'Service is unavailable right now.'];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.response);
      return [false, 'Service is unavailable right now.'];
    }
  },
}));

export default usePollStore;
