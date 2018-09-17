export default {
  namespace: 'example2',

  state: {},

  subscriptions: {
    // eslint-disable-next-line
    setup({ dispatch, history }: { dispatch: any; history: any }) {}
  },

  effects: {
    // eslint-disable-next-line
    *fetch({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'save' });
    }
  },

  reducers: {
    save(state: any, action: any) {
      return { ...state, ...action.payload };
    }
  }
};
