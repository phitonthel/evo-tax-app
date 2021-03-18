import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    setItems (state, payload) {
      console.log('Mutation Triggered')
      const items = [...state.items, payload]
      state.items = [...items]
    }
  },
  actions: {
    addItems (context, payload) {
      console.log('Action Triggered')
      context.commit('setItems', payload)
    }
  },
  modules: {
  }
})
