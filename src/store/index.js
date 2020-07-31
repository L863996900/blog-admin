import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user'
import * as user from '@/service/user'


Vue.use(Vuex)

const state = {
    user_info: {},
    loading: false
}
const mutations = {
    Set_Loading_State(state, data) {
        state.loading = data
    },
    SET_USER_INFO(state, data) {
        state.user_info = data
    }
}
const actions = {
    setLoadingState({commit}, data) {
        commit('Set_Loading_State', data)
    },
    async userInfo({commit}) {
        const res = await user.getUserInfo()
        commit('SET_USER_INFO', res)
        return res
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        user
    }
})
