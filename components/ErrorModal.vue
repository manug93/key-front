<template>
    <div v-if="error" class="modal">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>  
import store from "~/store/store";    
import {mapState,mapActions} from "vuex";
  export default {
    name: 'ErrorModal',
    data() {
      return {
        show: true,
      };
    },
    computed:{
        ...mapState(['error','errorMessage'])
    },
    methods: {
      ...mapActions(['setError','setErrorMessage']),
      close() {
        this.setError(false);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 10px;
    max-width: 800px;
    max-height: 90%;
    text-align: center;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
  }
  </style>
  