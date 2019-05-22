<template>
  <div class="container" style="width: 500px;">
    <div class="box" style="margin-top:100px;">
      <form @submit.prevent="signInAction">
        <fieldset :disabled="isLoading">
          <p
            class="is-size-3 has-text-weight-semibold has-text-grey-light"
            style="margin-top: 20px;"
          >Sign In</p>
          <div class="notification is-danger" v-if="error" style="margin-top: 10px;">{{error}}</div>
          <div class="field" style="margin-top: 30px;">
            <label class="label has-text-left">Username</label>
            <div class="control">
              <input class="input" v-model="username" type="text" placeholder="Username">
            </div>
          </div>
          <div class="field" style="margin-top: 30px;">
            <label class="label has-text-left">Password</label>
            <div class="control">
              <input class="input" v-model="password" type="password" placeholder="Password">
            </div>
          </div>
          <div class="field" style="margin-top: 30px;">
            <p class="control">
              <button
                class="button is-dark is-rounded is-fullwidth"
                :class="{ 'is-loading': isLoading }"
                type="submit"
              >Sign In</button>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "singin",
  data() {
    return {
      username: null,
      password: null,
      isLoading: false,
      error: null
    };
  },
  methods: {
    isUsernameValid() {
      return this.username && this.username.length >= 6;
    },
    isPasswordValid() {
      return this.password && this.password.length >= 6;
    },
    signInAction() {
      if (!this.isUsernameValid() || !this.isPasswordValid()) {
        this.error = this.$store.getters.usernamePasswordMinimumLengthErrorMessage;
        return;
      }
      this.isLoading = true;
      this.error = null;
      this.$store
        .dispatch("signIn", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          return this.$store.dispatch("getMyProfile");
        })
        .then(user => {
          const { type, uuid } = user;
          if (type === "doctor") {
            this.$router.push({ name: "doctor-home" });
          } else {
            this.$router.push({ name: "patient-home" });
          }
        })
        .catch(error => {
          if (error.response) {
            this.error = this.$store.getters.usernamePasswordErrorMessage;
          } else {
            this.error = this.$store.getters.genericErrorMessage;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
