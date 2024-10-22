<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/home" class="home-button">
        <i class="material-icons" style="font-size: 2em;">home</i>
      </router-link>
    </div>
    <div class="navbar-menu">
      <router-link v-if="!isAdmin" to="/cart">
        <i class="fas fa-shopping-cart"></i> {{ cartTotal }}
      </router-link>
      <span v-if="isLoggedIn">{{ username }}</span>
      <a href="#" @click="logout" class="logout-link">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$root.isLoggedIn;
    },
    isAdmin() {
      return this.$root.user.role === 'admin';
    },
    username() {
      return this.$root.user.username;
    },
    cartTotal() {
      return this.$root.cartTotal;
    }
  },
  methods: {
    logout() {
      if (confirm('Are you sure you want to logout?')) {
        this.$root.isLoggedIn = false;
        this.$root.user = {firstName: '', lastName: '', role: ''};
        localStorage.removeItem('token'); // Remove the token
        this.$router.push('/'); // Redirect to login page
      }
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

.logout-link {
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  transition: color 0.3s;
}

.logout-link:hover {
  color: #007bff;
}
</style>