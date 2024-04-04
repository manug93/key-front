import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
const apiUrl2 = process.env.API_BASE_URL;
import  {apiUrl,baseUrl,stripebaseUrl,keybaseUrl}  from '~/store/tools';
import {Cart, User, Coupon} from './models';
Vue.use(Vuex);
axios.interceptors.request.use((config) => {
  // Access the existing headers
  const headers = config.headers || {};

  const token = localStorage.getItem('token');
  
  if (token) {
    // Add the Bearer token header
    headers.Authorization = `Bearer ${token}`;
  }

  // Check if the request method is PUT
  if (config.method === 'PUT') {
    // Set Content-Type header for PUT requests
    headers['Content-Type'] = 'application/ld+json';
  }

  // Update the configuration with the new headers
  config.headers = headers;

  // Return the modified configuration
  //console.log(config);
  store.dispatch('setLoading', true);
  return config;
}, (error) => {
  // Handle any errors encountered during interception
  //console.error(error);
  store.dispatch('setLoading', false);
  store.dispatch('setError', true);
  store.dispatch('setErrorMessage', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    // Set loading back to false after each successful response
    store.dispatch('setLoading', false);
    return response;
  },
  error => {
    store.dispatch('setLoading', false);     // In case of an error, set loading back to false
    store.dispatch('setError', true);
    console.log(error);
    store.dispatch('setErrorMessage', error.response.data);
    return Promise.reject(error);
  });

const store = new Vuex.Store({
    state: {
        user:{},
        users:{},
        organizationMemberships:{},
        keys:{},
        subscriptions:{},
        isLoading: false,
        error:false,
        errorMessage:{},
        plan:{},
        fob:{},
        plans:[],
        fobs:[],
        token:{},
        coupon:{},
        auth:false,
        uploadProgress: 0,
        executionProgress:0
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
      // Update  users
      SET_USERS: (state, users) => {
        state.users = users;
      },
      // Update  users
      SET_RESSOURCE: (state, {name,data}) => {  ;
        if(data.hasOwnProperty('hydra:member')){
          Vue.set(state, name, data['hydra:member']);
        } else {
          Vue.set(state, name, data);
        }
      },
      SET_LOADING(state, value) {
        state.isLoading = value;
      },
      SET_ERROR(state, error) {
        state.error = error;
      },
      SET_ERROR_MESSAGE(state, message) {
        state.errorMessage = message;
      }
    },
  
    actions: {      
      setLoading({ commit }, value) {
        commit('SET_LOADING', value);
      },
      setError({ commit }, value) {
        commit('SET_ERROR', value);
      },
      setErrorMessage({ commit }, value) {
        commit('SET_ERROR_MESSAGE', value);
      },
      // Fetch token
      async fetchToken({ dispatch,commit },formData) {
        try {
          const response = await axios.post(`${apiUrl}/login_check`,formData,{
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
          const response = await axios.get(`${apiUrl}/me`);
          commit('SET_USER', response.data);
          commit('SET_AUTHENTICATED', true);
          return response
        } catch (error) { 
          console.log(error);
          if(error?.response?.status===401){
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
          const response = await axios.get(`${apiUrl}/getMyProducts/`);
          commit('SET_MY_PLAN', response.data.data);
          return response
        } catch (error) {          
          return error.response
        }
      },
       // Fetch  plans
      async fetchPlans({ commit }) {
        try {
          const response = await axios.get(`${apiUrl}/plans`);
          commit('SET_PLANS', response.data['hydra:member']);
          return response
        } catch (error) {          
          return error.response
        }
      },
       // Fetch  users
      async fetchUsers({ commit }) {
        try {
          const response = await axios.get(`${apiUrl}/users`);
          commit('SET_USERS', response.data['hydra:member']);
          return response
        } catch (error) {          
          return error.response
        }
      },
      // Create  user
      async createUser({ commit }, user) {
        try {
          const response = await axios.post(`${apiUrl}/users`,user);
          commit('SET_USER', response.data['hydra:member']);
          return response
        } catch (error) {          
          return error.response
        }
      },
      // Delete  user
      async deleteUser({ commit }, id) {
        try {
          const response = await axios.delete(`${apiUrl}/users/${id}`);
          return response
        } catch (error) {          
          return error.response
        }
      },
      // Create  plan
      async createPlan({ commit }, plan) {
        try {
          const response = await axios.post(`${apiUrl}/plans`,plan);
          commit('SET_PLANS', response.data['hydra:member']);
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
      // save user
      async saveUser({commit},form){
        try{
          const response = await axios.patch(`${apiUrl}/users/${form.id}`,form,{
          header:{
            ContentType:"application/ld+json"
          }
        })
        commit('SET_USER', response.data);
      }catch(error){
        return error
      }

      },
      // create picture
      async createPicture({commit},form){
        try{
          const response = await axios.post(`${apiUrl}/pictures`,form,{
          header:{
            ContentType:"multipart/form-data"
          }
        })
        return response
        
      }catch(error){
        return error
      }

      },
      // Register 
      async register({ dispatch,commit },form) {
        try {
          const response = await axios.post(`${baseUrl}/register`,form,{
            header:{
              ContentType:"application/json"
            }
          });
          dispatch('fetchToken',{username:form.email,password:form.password})
          commit('SET_USER', response.data);
          return response;
        } catch (error) {          
          return error
        }
      },
      async  getAll({commit},payload) {
        try {
          const response = await axios.get(`${baseUrl}/${payload.module}/${payload.resource}`);
          let data=response.data    
          commit('SET_RESSOURCE',{name:payload.resource,data} )
          return response.data;
        } catch (error) {
          return error;
        }
      },
      async fetchData({ commit }, { endpoint, method = 'GET', data = null }) {
        try {
          const response = await axios({
            url: `${apiUrl}/${endpoint}`,
            method,
            data,
          });
          commit('SET_DATA', response.data);
          return response;
        } catch (error) {
          throw error.response; // Re-throw to allow handling in components
        }
      },
      // Search for keys
      async searchKeys({ commit }, query) {
        await fetchData({ commit }, {
          endpoint: 'keys/search',
          method: 'GET',
          params: { query },
        });
      }     
      ,
      async  getById({commit},payload) {
        try {
          const response = await axios.get(`${baseUrl}/${payload.module}/${payload.resource}s/${payload.id}`);
          let data=response.data
          payload={resource:payload.resource,data:data}          
          commit('SET_RESSOURCE',payload)
          return response.data;
        } catch (error) {
          return error;
        }
      },
      async create({dispatch},payload) {
        console.log(payload);
        try {
          const response = await axios.post(`${baseUrl}/${payload.module}/${payload.resource}`, payload.data);                 
          dispatch('getAll',payload)
          return response.data;
        } catch (error) {
          return error;
        }
      },
      async  del({dispatch},payload) {
        try {
          const response = await axios.delete(`${baseUrl}/${payload.module}/${payload.resource}/${payload.id}`);                 
          dispatch('getAll',payload.resource)
          return response.data;
        } catch (error) {
          return error;
        }
      },
      async update({dispatch},payload) {
        try {          
          const response = await axios.put(`${baseUrl}/${payload.module}/${payload.resource}/${payload.data.id}`,payload.data,{
            header:{
              ContentType:"application/ld+json"
            }
          });       
          dispatch('getAll',{module:'api',resource:'users'})
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    },
    
 
  });
 
  export default store;