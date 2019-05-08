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
    doctor: null,
    patient: null,
    patients: null,
  },
  mutations: {
    UPDATE_USER(state, user) {
      if (user.type === 'doctor') {
        state.doctor = user;
      } else {
        state.patient = user;
      }
    },
  },
  actions: {
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
    getPatient({ commit }, uuid) {

    },
    getPatients({ commit }) {

    },
    updatePatient({ commit }, payload) {

    },
    searchPatientByName({ commit }, name) {

    },
  },
  getters: {
    genericErrorMessage: state => "Something went wrong! Please try again.",
    usernamePasswordMinimumLengthErrorMessage: state => "Username and password must be minimum 6 characters!",
    usernamePasswordErrorMessage: state => "Your username or password is invalid!",
  }
});
/* eslint-enable */
