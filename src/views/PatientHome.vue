<template>
  <div class="container" style="margin-top: 60px; max-width: 600px;">
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <div class="box" v-if="!isLoading && user">
      <form @submit.prevent="editProfileAction">
        <fieldset :disabled="!editMode || editProfileLoading">
          <p
            class="has-text-left is-size-3 has-text-weight-semibold has-text-grey-light"
            style="margin-top: 10px;"
          >Personal Details</p>
          <div class="columns">
            <div class="column">
              <div class="field" style="margin-top: 20px;">
                <label class="label has-text-left">Name</label>
                <div class="control">
                  <input class="input" v-model="user.name" type="text" placeholder="Name">
                </div>
              </div>
            </div>
            <div class="column" v-show="!editMode">
              <div class="field" style="margin-top: 20px;">
                <label class="label has-text-left">Age</label>
                <div class="control">
                  <input class="input" :value="getUserAge()" type="text" placeholder="Age">
                </div>
              </div>
            </div>
            <div class="column" v-show="editMode">
              <div class="field" style="margin-top: 20px;">
                <label class="label has-text-left">Birth Date</label>
                <div class="control">
                  <b-datepicker
                    v-model="user.Patient.birthDateFormatted"
                    placeholder="Birth Date"
                    editable
                  ></b-datepicker>
                </div>
              </div>
            </div>
          </div>
          <div class="field" style="margin-top: 20px;">
            <label class="label has-text-left">Email Address</label>
            <div class="control">
              <input class="input" v-model="user.email" type="text" placeholder="Email Address">
            </div>
          </div>
          <div class="field" style="margin-top: 20px;">
            <label class="label has-text-left">Phone Number</label>
            <div class="control">
              <input
                class="input"
                v-model="user.phoneNumber"
                type="text"
                placeholder="Phone Number"
              >
            </div>
          </div>
          <div class="field" style="margin-top: 20px;">
            <label class="label has-text-left">Mailing Address</label>
            <div class="control">
              <input
                class="input"
                v-model="user.Patient.address"
                type="text"
                placeholder="Mailing Address"
              >
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label has-text-left">City</label>
                <div class="control">
                  <input class="input" v-model="user.Patient.city" type="text" placeholder="City">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label has-text-left">State</label>
                <div class="control">
                  <input class="input" v-model="user.Patient.state" type="text" placeholder="State">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label has-text-left">Country</label>
                <div class="control">
                  <input
                    class="input"
                    v-model="user.Patient.country"
                    type="text"
                    placeholder="Country"
                  >
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label has-text-left">Postal Code</label>
                <div class="control">
                  <input
                    class="input"
                    v-model="user.Patient.postalCode"
                    type="text"
                    placeholder="Postal Code"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="field" style="margin-top: 40px;" v-show="editMode">
            <p class="control">
              <button
                class="button is-light is-rounded"
                @click="cancelEditProfile"
                type="reset"
              >Cancel</button>

              <button
                class="button is-dark is-rounded is-pulled-right"
                :class="{ 'is-loading': editProfileLoading }"
                type="submit"
              >Save</button>
            </p>
          </div>
        </fieldset>
        <div class="field" style="margin-top: 40px;" v-show="!editMode">
          <p class="control">
            <button
              class="button is-dark is-rounded is-fullwidth"
              @click="editProfile"
              type="button"
            >Edit your profile</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      isLoading: true,
      editMode: false,
      user: null,
      editProfileLoading: false
    };
  },
  methods: {
    getUserAge() {
      return moment(this.user.Patient.birthDate).fromNow(true);
    },
    editProfile() {
      this.editMode = true;
    },
    cancelEditProfile() {
      this.editMode = false;
      this.editProfileLoading = false;
      this.deepCopyUser();
    },
    editProfileAction() {
      this.editProfileLoading = true;
      this.$store
        .dispatch("updatePatientProfile", this.user)
        .then(() => {
          this.$toast.open({
            duration: 2000,
            message: this.$store.getters.profileUpdateMessage,
            position: "is-bottom",
            type: "is-success"
          });
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
          this.cancelEditProfile();
        });
    },
    deepCopyUser() {
      const user = this.$store.getters.user;
      const userCopy = {
        Patient: {
          birthDate: user.Patient.birthDate,
          birthDateFormatted: moment(user.Patient.birthDate).toDate(),
          address: user.Patient.address,
          city: user.Patient.city,
          state: user.Patient.state,
          country: user.Patient.country,
          postalCode: user.Patient.postalCode
        },
        username: user.username,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber
      };
      this.user = userCopy;
    }
  },
  beforeMount() {
    this.$store
      .dispatch("getMyProfile")
      .then(user => {
        if (!user) {
          this.$router.push({ name: "sign-in" });
        } else {
          this.deepCopyUser();
        }
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