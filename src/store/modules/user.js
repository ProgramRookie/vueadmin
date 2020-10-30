/*
 * @Author: 肥仔
 * @Date: 2020-10-27 16:04:32
 * @LastEditors: 肥仔
 * @LastEditTime: 2020-10-28 09:24:11
 * @Description: file content
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.name = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_RULE: (state, rule) => {
    state.rule = rule
  },
  SET_RULENAME: (state, ruleName) => {
    state.ruleName = ruleName
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // const { data } = response
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username, avatar, ruleName, rule } = data
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_RULENAME', ruleName)
        commit('SET_RULE', rule)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

