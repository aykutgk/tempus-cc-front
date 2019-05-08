<template>
  <div class="container" style="width: 500px;">
    <div class="box" style="margin-top:100px;">
      <form @submit.prevent="signInAction">
        <fieldset :disabled="isLoading">
          <p
            class="is-size-2 has-text-weight-semibold has-text-grey"
            style="margin-top: 30px;"
          >Sign In</p>
          <div class="notification is-danger" v-if="error" style="margin-top: 10px;">{{error}}</div>
          <div class="field" style="margin-top: 30px;">
            <!-- <label class="label">Username</label> -->
            <div class="control">
              <input class="input" v-model="username" type="text" placeholder="Username">
            </div>
          </div>
          <div class="field" style="margin-top: 30px;">
            <!-- <label class="label">Password</label> -->
            <div class="control">
              <input class="input" v-model="password" type="password" placeholder="Password">
            </div>
          </div>
          <div class="field" style="margin-top: 30px;">
            <p class="control">
              <button
                class="button is-primary is-rounded is-fullwidth"
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
      // Minimum username length is 5
      return this.username && this.username.length >= 6;
    },
    isPasswordValid() {
      // Minimum password length is 8
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
        .then(user => {
          // successful log in
          console.log("here");
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
