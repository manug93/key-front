import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import  {baseUrl}  from '~/store/tools';
import {Cart, User, Coupon} from './models';
Vue.use(Vuex);
axios.interceptors.request.use((config) => {
  // Access the existing headers
  const headers = config.headers || {};

  // Add the Bearer token header
  headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  
  // Set Content-Type header
  headers['Content-Type'] = 'application/ld+json';

  // Update the configuration with the new headers
  config.headers = headers;

  // Return the modified configuration
  return config;
}, (error) => {
  // Handle any errors encountered during interception
  //console.error(error);
  return Promise.reject(error);
});

const store = new Vuex.Store({
    state(){
      return {
        user:{},
        plan:{},
        plans:[],
        token:{},
        coupon:{},
        auth:false,
        uploadProgress: 0,
        executionProgress:0
    }
  },
    mutations: {
      //Update cart
      SET_CART: (state,cart) =>{
        state.cart = cart;
      },
      SET_AUTHENTICATED: (state,auth) =>{
        state.auth = auth;
      },
      //Update cart
      SET_COUPON: (state,coupon) =>{
        state.coupon = coupon;
      },
      // Update token
      SET_TOKEN: (state, token) => {
        localStorage.setItem('token', token);
        state.token = token;
      },
      // Update user
      SET_USER: (state, user) => {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = new User(user);
      },
      // Update my plan
      SET_PLAN: (state, plan) => {
        state.plan = plan;
      },
      // Update  plans
      SET_PLANS: (state, plans) => {
        state.plans = plans;
      },
    },
  
    actions: {      
      // Fetch token
      async fetchToken({ dispatch,commit },formData) {
        try {
          const response = await axios.post(`${baseUrl}/api/login_check`,formData,{
            header:{
              ContentType:"application/json"
            }
          });
          
          commit('SET_TOKEN', response.data.token);
          dispatch('fetchUser');
          commit('SET_AUTHENTICATED',true);
          return response
        } catch (error) {
          return error.response
        }
      },
      // Fetch user
      async fetchUser({ commit }) {
        try {
          const response = await axios.get(`${baseUrl}/api/me`);
          commit('SET_USER', response.data);
          return response
        } catch (error) { 
          console.log(error);
          if(error.response.status===401){
            commit('SET_AUTHENTICATED',true);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }         
          return error.response
        }
      },
       // Fetch my plan
      async fetchMyPlan({ commit }) {
        try {
          const response = await axios.get(`${baseUrl}/api/getMyProducts/`);
          commit('SET_MY_PLAN', response.data.data);
          return response
        } catch (error) {          
          return error.response
        }
      },
       // Fetch  plans
      async fetchPlans({ commit }) {
        try {
          const response = await axios.get(`${baseUrl}/api/plans`);
          commit('SET_PLANS', response.data);
          return response
        } catch (error) {          
          return error.response
        }
      },
      // Create  plan
      async createPlan({ commit }, plan) {
        try {
          const response = await axios.post(`${baseUrl}/api/plans`,plan);
          commit('SET_PLANS', response.data);
          return response
        } catch (error) {          
          return error.response
        }
      },
       
      // Fetch cart
      async fetchCart({ commit }) {
        try {
          commit('SET_CART', new Cart());
        } catch (error) {          
          return error
        }
      },
      async saveUser({commit},form){
        try{
          const response = await axios.patch(`${baseUrl}/api/users/${form.id}`,form,{
          header:{
            ContentType:"application/json"
          }
        })
        commit('SET_USER', response.data);
      }catch(error){
        return error
      }

      },
      // Register 
      async register({ commit },form) {
        try {
          const response = await axios.post(`${baseUrl}/register`,form,{
            header:{
              ContentType:"application/json"
            }
          });
          commit('SET_USER', response.data);
        } catch (error) {          
          return error
        }
      },
      
    },
 
  });
 
  export default store;