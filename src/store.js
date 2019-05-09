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
        commit('UPDATE_USER', user);
        return user;
      });
    },
    signOut({ commit }) {
      commit('UPDATE_USER', null);
      window.localStorage.removeItem("token");
    },
    getMyProfile({ commit }) {
      return Axios({
        method: "get",
        url: `/users/me`
      }).then(({ data }) => {
        const user = data;
        commit('UPDATE_USER', user);
        return user;
      });
    },
    getPatients({ commit }) {

    },
    updatePatient({ commit }, payload) {

    },
    searchPatientByName({ commit }, name) {

    },
  },
  getters: {
    user: state => state.user,
    genericErrorMessage: state => "Something went wrong! Please try again.",
    usernamePasswordMinimumLengthErrorMessage: state => "Username and password must be minimum 6 characters!",
    usernamePasswordErrorMessage: state => "Your username or password is invalid!",
  }
});
/* eslint-enable */
