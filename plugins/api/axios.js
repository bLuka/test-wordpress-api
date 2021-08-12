export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (process.browser && config) {
      if (store.state.utiles.loading.active) {
        store.commit('utiles/loading/set', true)
      }
      // config.headers.common["Authorization"] = `Bearer ${token}`;
    }
  })
  $axios.onResponse((response) => {
    store.commit('utiles/loading/set', false)
    if (process.browser && response.data) {
      const msg = response.data.message
      if (msg) store.commit('utiles/alert/alertMe', { msg })
    }
  })
  $axios.onError((error) => {
    store.commit('utiles/loading/set', false)
    if (process.browser && error.response.data) {
      const msg = error.response.data.data.message
      if (msg) store.commit('utiles/alert/alertMe', { msg })
    }
  })
}
