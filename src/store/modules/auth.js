/*
 * @Description:用户验证
 * @Author: Lewis
 * @Date: 2022-05-31 13:32:21
 * @LastEditTime: 2023-12-09 09:58:29
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
  setRoles,
  getRoles,
  removeRoles,
  setInfos,
  getInfos,
  removeInfos,
} from "@/utils/auth";
import { login, getInfo, logout } from "../../api/user/auth";
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
  roles: getRoles(),
  info: getInfos(),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, info) => {
    state.roles = roles;
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
          commit("SET_ROLES", data.user.type);
          commit("SET_USER_NAME", username.trim());
          setUsername(username.trim());
          setToken(data.token);
          setInfos(data.user.name);
          setRoles(data.user.type);
          resolve();
          defineComponent.$toast.add({
            severity: "success",
            summary: "Success Message",
            detail: "Order submitted",
            life: 3000,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, getters }) {
    const token = getters.getToken;

    // Perform any other cleanup if needed

    // Clear the token
    commit("SET_TOKEN", "");
    removeToken();
    removeUsername();
    removeRoles();
    removeInfos();

    // Resolve immediately since we don't need to wait for a server response
    return Promise.resolve();
  },
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
