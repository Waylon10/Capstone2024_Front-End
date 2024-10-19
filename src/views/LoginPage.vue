<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Login</h1>
    </header>
    <form @submit.prevent="login">
      <div class="row">
        <div class="input-field col s12">
          <input id="username" type="email" v-model="username" required>
          <label for="username">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" required>
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <label>
          <input type="checkbox" v-model="isAdmin" />
          <span>Login as Admin</span>
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
      <button class="btn btn-secondary waves-effect waves-light" type="button" @click="cancel">Back</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { loginUser } from '@/services/loginService';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      message: '',
      isAdmin: false // Add a flag to determine if the user is an admin
    };
  },
  methods: {
    async login() {
      try {
        const loginData = {
          username: this.username,
          password: this.password
        };
        const response = await loginUser(loginData, this.isAdmin);

        if (response && response.role) {
          const { role } = response;
          if (role === 'admin') {
            this.$router.push({ name: 'AdminDashboard' });
          } else if (role === 'customer') {
            this.$router.push({ name: 'HomePage' });
          } else {
            this.message = 'Unknown user role.';
          }
        } else {
          this.message = 'Invalid email or password.';
        }
      } catch (error) {
        this.message = `Failed to login: ${error.message}`;
      }
    },
    cancel() {
      window.history.back();
    }
  }
};
</script>

<style scoped>
/* Styles remain the same */
</style>