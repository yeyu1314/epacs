//vuex最核心的管理对象store

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'


// import User from './user/index'
// const state = {
//   userName : 'admin'
// }

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  /*modules : {
    User
  }*/
})
