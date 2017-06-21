import * as types from './mutation-types';
import { Client } from './client';
import { RestClient } from './client_rest';

const client = new Client();
const rest_client = new RestClient();

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

  getApiIndex({ commit }, params) {
    const project = params.project;
    const url = `/apis/${ project }/index.json`;
    return client.get(url)
      .then((data) => {
        return commit(types.SAVE_API_INDEX, data);
      });
  },

  request({ _commit }, params) {
    const url = params.baseUrl + params.url;
    const method = params.method;
    const param = method === 'get' ? params.params : {};
    const body = method === 'post' ? params.params : {};
    return rest_client.request(url, method, param, body);
  },
};
