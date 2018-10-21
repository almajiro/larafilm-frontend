import axios from 'axios'

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
    axios.get('http://larafilm.spectre.local/api')
      .then(response => {
        state.commit("setAppName", response.data.name)
      })
  }
}
