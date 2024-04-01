import Vue from 'vue';
import Fuse from 'fuse.js';

Vue.use({
  install(Vue) {
    Vue.prototype.$fuse = Fuse;
  }
});