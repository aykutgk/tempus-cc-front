import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

/* eslint-disable */
Axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

Axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default new Vuex.Store({
  state: {
    userUUID: null,
    userType: null,
    user: null,
    patients: null,
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    didUserSignIn({ commit }, payload) {
      const token = window.localStorage.getItem('token');
      if (!token) {
        return;
      }
      return this.dispatch('getMyProfile');
    },
    signIn({ commit }, payload) {
      return Axios({
        method: "post",
        url: `/users/sign-in`,
        data: payload,
      }).then(({ data }) => {
        const { token, user } = data;
        window.localStorage.setItem("token", token);
        return user;
      });
    },
    signOut({ commit }) {
      commit('UPDATE_USER', null);
      window.localStorage.removeItem("token");
    },
    getMyProfile({ commit, state }) {
      if (state.user) {
        return Promise.resolve(state.user);
      }
      return Axios({
        method: "get",
        url: `/users/me`
      }).then(({ data }) => {
        const user = data;
        commit('UPDATE_USER', user);
        return user;
      });
    },
    getDoctorPatients({ commit }, searchInput) {
      return Axios({
        method: "get",
        url: `/doctors/patients/`,
        params: { name: searchInput }
      }).then(({ data }) => {
        const patients = data;
        return patients;
      });
    },
    updatePatientProfile({ commit }, payload) {
      return Axios({
        method: "put",
        url: '/patients/me',
        data: payload,
      }).then(({ data }) => {
        const user = data;
        commit('UPDATE_USER', user);
        return user;
      });
    },
  },
  getters: {
    user: state => state.user,
    genericErrorMessage: state => "Something went wrong! Please try again.",
    usernamePasswordMinimumLengthErrorMessage: state => "Username and password must be minimum 6 characters!",
    usernamePasswordErrorMessage: state => "Your username or password is invalid!",
    profileUpdateMessage: state => "Profile updated successfully.",
  }
});
/* eslint-enable */
