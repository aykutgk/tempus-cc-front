<template>
  <div class="container" style="margin-top: 60px; max-width: 600px;">
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <div class="box" v-if="!isLoading && patients">
      <div v-show="!selectedPatient">
        <p
          class="is-size-3 has-text-weight-semibold has-text-grey-light"
          style="margin-top: 10px; margin-bottom: 10px;"
          v-show="!selectedPatient"
        >Patient List</p>

        <div class="control" :class="{ 'is-loading': isSearching }">
          <input
            class="input is-rounded"
            @input="search"
            v-model="searchInput"
            type="text"
            placeholder="Search patients by name"
          >
        </div>
        <table class="table is-fullwidth is-striped is-hoverable" style="margin-top: 10px;">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in patients" :key="user.id" @click="selectPatient(user)">
              <td>{{user.name}}</td>
              <td>{{getUserAge(user.Patient.birthDate)}} old</td>
              <td>{{user.Patient.city}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="selectedPatient">
        <p
          class="is-size-3 has-text-weight-semibold has-text-grey-light"
          style="margin-top: 10px; margin-bottom: 10px;"
        >Patient Details</p>
        <div style="border: 1px solid #ddd; margin-bottom: 20px;"></div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">Name:</div>
          <div class="column">{{selectedPatient.name}}</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">Age:</div>
          <div class="column">{{getUserAge(selectedPatient.Patient.birthDate)}} old</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">Email:</div>
          <div class="column">{{selectedPatient.email}}</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">Phone Number:</div>
          <div class="column">{{selectedPatient.phoneNumber}}</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">Address:</div>
          <div class="column">{{selectedPatient.Patient.address}}</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">City:</div>
          <div class="column">{{selectedPatient.Patient.city}}</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">State:</div>
          <div class="column">{{selectedPatient.Patient.state}}</div>
        </div>
        <div class="columns">
          <div class="column has-text-weight-semibold is-one-quarter has-text-right">Country:</div>
          <div class="column">{{selectedPatient.Patient.country}}</div>
        </div>
        <button class="button is-light" @click="selectedPatient = null">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      isLoading: true,
      patients: [],
      selectedPatient: null,
      searchInput: null,
      isSearching: false
    };
  },
  methods: {
    search: debounce(function(e) {
      this.isSearching = true;
      this.$store
        .dispatch("getDoctorPatients", this.searchInput)
        .then(patients => {
          this.patients = patients ? patients : [];
        })
        .catch(err => {
          this.$toast.open({
            duration: 5000,
            message: this.$store.getters.genericErrorMessage,
            position: "is-bottom",
            type: "is-danger"
          });
        })
        .finally(() => {
          this.isSearching = false;
        });
    }, 1000),
    getUserAge(birthDate) {
      return moment(birthDate).fromNow(true);
    },
    selectPatient(user) {
      this.selectedPatient = user;
    }
  },
  beforeMount() {
    this.$store
      .dispatch("getMyProfile")
      .then(user => {
        if (!user) {
          this.$router.push({ name: "sign-in" });
        } else {
          return this.$store.dispatch("getDoctorPatients");
        }
      })
      .then(patients => {
        this.patients = patients ? patients : [];
      })
      .catch(err => {
        this.$toast.open({
          duration: 5000,
          message: this.$store.getters.genericErrorMessage,
          position: "is-bottom",
          type: "is-danger"
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  mounted() {}
};
</script>