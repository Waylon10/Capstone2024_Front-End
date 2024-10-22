<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/admin" class="home-button">
        <i class="material-icons" style="font-size: 2em;">home</i>
      </router-link>
    </div>
    <div class="navbar-menu">
      <a href="#" @click="goBack" class="back-button">
        <i class="material-icons" style="font-size: 2em;">arrow_back</i>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: #fff;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.navbar a:hover {
  text-decoration: underline;
}

.home-button {
  display: flex;
  align-items: center;
  color: #fff;
  transition: color 0.3s;
}

.home-button:hover {
  color: #007bff;
}

.back-button {
  display: flex;
  align-items: center;
  color: #fff;
  transition: color 0.3s;
}

.back-button:hover {
  color: #007bff;
}
</style>