import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  project: '',
  file: '',
  projectInfo: {
    baseUrl: '',
    files: [],
  },
  content: {},
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production',
});
