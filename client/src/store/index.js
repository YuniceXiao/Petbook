import Vue from "vue";
import Vuex from "vuex";
import router from '../router'
import { defaultClient as apolloClient } from "../main";
import {GET_POSTS, SIGNIN_USER, SIGNUP_USER, GET_CURRENT_USER, ADD_POST} from '../queries'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
    error: null
  },
  mutations: {
    setPosts : (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    clearUser:(state, payload=null) => {
      state.user = null
    },
    setError: (state, payload) => {
      state.error = payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      commit("setLoading", true)
      //use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query:GET_POSTS,
        })
        .then(({ data }) => {
          //get data from actions to state via mutations
          commit("setPosts", data.getPosts); // pass data from action to a mutation function
          // console.log(data.getPosts);
          commit("setLoading", false)
        })
        .catch((err) => {
          console.error(err)
          commit("setLoading", false)
        });
    },
    signinUser: ({ commit }, payload) => {
      commit("clearUser");
      commit("setLoading", true);
      apolloClient
        .mutate({ //other than query, this time we want to perform mutation
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.signinUser.token);
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go() //refresh the current page and dispatch getCurrentUser action
        })
        .catch(err => {
          commit("setError", err);
          console.error(err);
        });
    },
    signupUser: ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.signupUser.token);
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit("clearUser");
      // remove token in localStorage
      localStorage.setItem("token", "");
      // end session
      await apolloClient.resetStore();
      // redirect to home once user log out
      router.push("/");
    },
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit("setLoading", false);
          // Add user data to state
          commit("setUser", data.getCurrentUser);
          console.log(data.getCurrentUser);
        })
        .catch(err => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
        })
        .then(({ data }) => {
          console.log(data.addPost);
        })
        .catch(err => {
          console.error(err);
        });
    },

  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error
  }
});
