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
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
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
    fetchData() {
      this.$axios
        .get('/wc/v3/products')
        .then(({ data }) => (this.products = data))
    },
    login() {
      this.$auth
        .loginWith('cookie', {
          data: {
            email: this.email,
            password: this.pass,
            AUTH_KEY: 'tikitaka-vendor',
          },
        })
        .then(({ data }) => {
          console.warn(data)
          this.$forceUpdate()
          alert('you are in 👍')
        })
        .catch((err) => {
          console.warn(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
