import colors from 'vuetify/es5/util/colors'
export default {
  // target: 'static',
  head: {
    titleTemplate: '%s - test-wordpress-api',
    title: 'test-wordpress-api',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: ["@/plugins/api/axios"],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth-next'],

  axios: {
    baseURL: '/wp/',
    proxy: true,
  },

  proxy: {
    '/wp/': { target: 'http://marketplace.prod.tiki-taka.fr/wp-json', pathRewrite: {'^/wp/': ''} },
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
      },
    },
    strategies: {
      cookie: {
        token: {
          property: 'data.jwt',
          global: true,
          required: true,
          type: 'Bearer',
        },
        endpoints: {
          login: {
            url: '/jwt/auth',
            method: 'post',
            propertyName: 'data.jwt',
          },
          user: false,
          logout: false,
          globalToken: true,
          autoFetchUser: true,
        },
      },
    },
    redirect: false,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
