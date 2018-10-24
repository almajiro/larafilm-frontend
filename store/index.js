import axios from '~/plugins/axios'

export const state = () => ({
  appName: ''
})

export const mutations = {
  setAppName(state, appName) {
    state.appName = appName
  }
}

export const actions = {
  loadAppBasics(state) {
    axios.get('/')
      .then(response => {
        state.commit("setAppName", response.data.name)
      })
  }
}
