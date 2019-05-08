import Vue from 'vue';
import Router from 'vue-router';
import Signin from './views/Signin.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/d',
      name: 'doctor-home',
      component: Signin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/p',
      name: 'patient-home',
      component: Signin,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
