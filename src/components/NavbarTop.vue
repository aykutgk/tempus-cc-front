<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img :src="require('@/assets/tempus-white-logo.png')" width="112" height="28">
      </div>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start"></div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="$store.getters.user">
          <a class="navbar-link">{{$store.getters.user.username}}</a>

          <div class="navbar-dropdown">
            <a class="navbar-item" @click="signOut">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarTop",
  data() {
    return {};
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut").then(() => {
        this.$router.push({ name: "sign-in" });
      });
    }
  },
  beforeMount() {}
};
</script>