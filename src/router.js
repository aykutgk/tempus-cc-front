import Vue from 'vue';
import Router from 'vue-router';
import Signin from './views/Signin.vue';
import DoctorHome from './views/DoctorHome.vue';
import PatientHome from './views/PatientHome.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: Signin,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/d',
      name: 'doctor-home',
      component: DoctorHome,
      meta: {
        requiresAuth: true,
        doctorOnly: true,
      },
    },
    {
      path: '/p',
      name: 'patient-home',
      component: PatientHome,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
