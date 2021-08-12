<template>
  <div>
    <h3 class="display-2">
      User Status:
      <span :class="`${isuser ? 'green' : 'red'}--text`">
        {{ isuser ? 'loggedIn' : 'not loggedIn' }}
      </span>
    </h3>
    <v-card max-width="500" class="mx-auth mt-7">
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" />
          <v-text-field v-model="pass" />
          <v-btn type="submit">Login Now</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn @click="logout">LogOut Now</v-btn>
    <div class="mt-16">
      <v-btn @click="fetchData" x-large class="mb-5">fetch products</v-btn>
      <v-card>
        <v-card-text>
          {{ products }}
        </v-card-text>
      </v-card>
    </div>
    <div class="mt-16">
      <v-btn @click="fetchInfo" x-large class="mb-5">fetch user details</v-btn>
      <v-card>
        <v-card-text>
          {{ info }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      info: {},
      email: '',
      pass: '',
    }
  },
  computed: {
    isuser() {
      return this.$auth.loggedIn
    },
  },
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$forceUpdate()
        alert('You are logged out')
      })
    },
    fetchInfo() {
      const config = {
        headers: { 'Cookie': 'simple-jwt-login-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2Mjg4MDExOTgsImV4cCI6MTYyODgwNDc5OCwiZW1haWwiOiJkZXYrOEB0aWtpLXRha2EuZnIiLCJpZCI6MTEsInNpdGUiOiJodHRwOlwvXC9tYXJrZXRwbGFjZS5wcm9kLnRpa2ktdGFrYS5mciIsInVzZXJuYW1lIjoiZGV2OEB0aWtpLXRha2EuZnIifQ.VSClzcCulJNU9R1U1cgzf11qrBFTDQijhGyftPWu8KMLzSZmvHvlpBgT51hFKY-FnvUr7GYZV-6EYc0gt-s64Q' }
      }
      /*
const config = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
}

this.$axios.post(`/post/${id}`, model, config)
*/
      this.$axios
        .get('/wp/wp/v2/users/me', config)
        .then(({ data }) => (this.info = data))
    },
    fetchData() {
      this.$axios
        .get('/wp/wc/store/products')
        .then(({ data }) => (this.products = data))
    },
    login() {
      console.log("Loggin in...")
      this.$axios
        .post('/wp/jwt/auth', {
          email: this.email,
          password: this.pass,
          AUTH_KEY: 'tikitaka-vendor',
        })
        .then(({ data }) => {
          console.log(data.data.jwt);
          document.cookie = `simple-jwt-login-token=${data.data.jwt}`;
        })
        .catch(console.warn)
    },
  },
}
</script>

<style lang="scss" scoped></style>
