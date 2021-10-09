import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt_auth: '',
    jwt_refresh: '',
  },
  mutations: {
    authenticate(state, payload){
      state.jwt_auth = payload.jwt_auth
      state.jwt_refresh = payload.jwt_refresh
    },
    clear_auth(state){
      state.jwt_auth = ''
      state.jwt_refresh = ''
    },
    set_jwt_auth(state, jwt_auth){
      state.jwt_auth = jwt_auth
    }
  },
  getters:{
    user_authenticated(state){
      return state.jwt_auth && state.jwt_refresh
    },
    auth_token(state){
      return state.jwt_auth
    }
  },
  actions: {},
  modules: {}
})
