import * as types from './mutation-types';
import { Client } from './client';

const client = new Client();

export default {
  getApiFile({ commit }, params) {
    const project = params.project;
    const file = params.file;
    const url = `/apis/${ project }/${ file }.json`;
    return client.get(url)
    .then((data) => {
      return commit(types.SAVE_API_CONTENT, { project, file, data });
    });
  },
};
