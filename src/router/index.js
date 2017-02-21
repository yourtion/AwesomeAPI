import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from 'views/Home';

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      children: [
        // {
        //   path: '',
        //   component: resolve => require([ 'components/Index.vue' ], resolve),
        // },
        {
          path: '/api/:project/:file',
          component: resolve => require([ 'views/API.vue' ], resolve),
        },
      ],
    },
  ],
});
