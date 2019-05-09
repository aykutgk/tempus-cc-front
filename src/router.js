import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Signin from './views/Signin.vue';
import DoctorHome from './views/DoctorHome.vue';
import PatientHome from './views/PatientHome.vue';

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    return next({ name: 'sign-in' });
  }

  const { user } = store.getters;

  if (to.meta.requiresAuth && !user) {
    return next({ name: 'sign-in' });
  }

  if (to.name === 'sign-in' && user) {
    if (user.type === 'doctor') {
      return next({ name: 'doctor-home' });
    }
    return next({ name: 'patient-home' });
  }
  return next();
});

export default router;
