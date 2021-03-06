import * as types from './mutation-types';

export default {
  [types.SAVE_API_CONTENT](state, payload) {
    state.project = payload.project;
    state.file = payload.file;
    state.content = payload.data;
  },
  [types.SAVE_API_INDEX](state, payload) {
    state.projectInfo.baseUrl = payload.baseUrl;
    state.projectInfo.files = payload.files;
  },
};
