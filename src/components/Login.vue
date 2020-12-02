<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <b-card
      title="Login"
      style="width: 25%;"
    >

      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="email"
        >
          <input class="input-field" id="email" v-model="loginInfo.email" placeholder="Enter Email"/>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="password">
          <input class="input-field" id="password" v-model="loginInfo.password" placeholder="Enter Password"/>
        </b-form-group>

        <div v-if="error" class="text-center">
          <b-alert show variant="danger">{{error}}</b-alert>
        </div>

        <div class="text-center">
          <b-button type="submit" variant="primary" class="w-75">Login</b-button>
        </div>
      </b-form>
    </b-card>
    <p class="mt-2">Dont have an account? <router-link to="/signup">Sign up here!</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        email: '',
        password : ''
      },
      error: null
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store.dispatch('loginUser', this.loginInfo).then(() => {
        this.$router.push('/');
      }).catch(error => {
        this.error = error;
      });
    }
  }
}
</script>

<style>
.input-field {
  display: block;
  height: calc(1.5em + 0.75rem + 2px);
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>