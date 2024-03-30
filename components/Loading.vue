<template>
    <div v-if="isLoading" class="loading-screen">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  import store from "~/store/store";    
import {mapState,mapActions} from "vuex";
  export default {
    name: 'Loading.vue',
    store:store,
    computed:{
        ...mapState(['isLoading'])
    }
  };
  </script>
  
  <style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #ffffff;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  