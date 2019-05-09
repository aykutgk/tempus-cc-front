<template>
  <div id="app">
    <navbar-top/>
    <router-view v-show="!loading"/>
  </div>
</template>
<script>
import NavbarTop from "@/components/NavbarTop.vue";

export default {
  name: "app",
  components: {
    NavbarTop
  },
  data() {
    return {
      loading: true
    };
  },
  beforeMount() {
    this.$store
      .dispatch("didUserSignIn")
      .then(user => {
        if (!user) {
          this.$router.push({ name: "sign-in" });
        } else {
          if (user.type === "doctor") {
            this.$router.push({ name: "doctor-home" });
          } else {
            this.$router.push({ name: "patient-home" });
          }
        }
      })
      .catch(err => {
        this.$router.push({ name: "sign-in" });
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
