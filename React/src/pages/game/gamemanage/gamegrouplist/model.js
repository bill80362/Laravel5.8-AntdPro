import { addRule, queryRule, removeRule, updateRule } from './service';

const Model = {
  namespace: 'listGameGroupList',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const token = yield select(state => state.login.token);
      const response = yield call(queryRule, payload,token);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put, select }) {
      const token = yield select(state => state.login.token);
      const response = yield call(addRule, payload,token);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put, select}) {
      const token = yield select(state => state.login.token);
      const response = yield call(removeRule, payload,token);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put, select }) {
      const token = yield select(state => state.login.token);
      const response = yield call(updateRule, payload,token);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
