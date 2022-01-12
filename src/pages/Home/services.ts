import userService from '@/services/user';

// src/models/user.ts
export default {
  state: {
    name: 'taoxiaobao',
    age: 20,
  },
  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },
  effects: (dispatch) => ({
    async fetchUserInfo() {
      const data = await userService.getUser();
      dispatch.user.update(data);
    },
  }),
};
