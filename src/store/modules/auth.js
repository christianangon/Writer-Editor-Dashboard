/*
 * @Description:用户验证
 * @Author: Lewis
 * @Date: 2022-05-31 13:32:21
 * @LastEditTime: 2023-12-07 23:06:09
 * @LastEditors: Ian
 */
import {
  getToken,
  setToken,
  setUsername,
  getUsername,
  removeToken,
  removeUsername,
  getUserId,
  setUserId,
} from "@/utils/auth";
import { login, getInfo } from "../../api/user/auth";
import { defineComponent } from "vue";
import { setToast } from "@/utils/auth";

const state = {
  token: getToken(),
  name: "",
  username: getUsername(),
  userId: getUserId(),
  globalLoading: false,
  globalToast: {},
  roles: [],
  permissions: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_NAME: (state, username) => {
    state.username = username;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER_ID: (state, id) => {
    state.userId = id;
  },
  SET_LOADING: (state, payload) => {
    state.globalLoading = payload;
  },
  SET_GLOBAL_TOAST: (state, payload) => {
    state.globalToast = payload;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
      })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          commit("SET_USER_NAME", username.trim());
          setUsername(username.trim());
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then(() => {
  //         commit("SET_TOKEN", "");
  //         removeToken();
  //         removeUsername();
  //         window.sessionStorage.clear();
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          const { name, id, username, roles, permissions } = data;
          commit("SET_NAME", name);
          commit("SET_USER_ID", id);
          commit("SET_USER_NAME", username);
          commit("SET_ROLES", roles);
          commit("SET_PERMISSIONS", permissions);

          setUsername(name);
          setUserId(id);

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  setLoading({ commit }, payload) {
    commit("SET_LOADING", payload);
  },
  setToast({ commit }, payload) {
    commit("SET_GLOBAL_TOAST", payload);
  },
};

const getters = {
  globalLoading(state) {
    return state.globalLoading;
  },
  globalToast(state) {
    return state.globalError;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
