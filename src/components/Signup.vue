<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <b-card
      title="Signup"
      style="width: 25%;"
    >

      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="email"
        >
          <input class="input-field" id="email" v-model="signupInfo.email" placeholder="Enter Email"/>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="password">
          <input class="input-field" id="password" v-model="signupInfo.password" placeholder="Enter Password"/>
        </b-form-group>

        <b-form-group id="input-group-2" label="Confirm Password:" label-for="password">
          <input class="input-field" id="password" v-model="signupInfo.confirmPass" placeholder="Confirm Password"/>
        </b-form-group>
        
        <div v-if="error">
          <b-alert show variant="danger">{{error}}</b-alert>
        </div>

        <div class="text-center">
          <b-button type="submit" variant="primary" class="w-75">Signup</b-button>
        </div>
      </b-form>
    </b-card>
    <p class="mt-2">Already have an account? <router-link to="/login">Login here!</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      signupInfo: {
        email: '',
        password: '',
        confirmPass: ''
      },
      error: null
    }
  },
  methods :{
    onSubmit(e) {
      e.preventDefault();
      if (this.password === this.confirmPass) {
        this.$store.dispatch('createUser', this.signupInfo).then(() => {
          this.$router.push('/');
        }).catch(error => {
          this.error = error;
        });
      }
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