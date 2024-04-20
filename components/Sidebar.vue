<template>
  <div>
        
  <!--start sidebar-->
  <aside class="sidebar-wrapper">
    <div class="sidebar-header">
      <div class="logo-icon">
        <img src="/assets/images/logo-icon.png" class="logo-img" alt="">
      </div>
      <div class="logo-name flex-grow-1">
        <div class="m-0 py-2">
          <p class="mb-0">Key Yes</p>
          <small>yes we key</small>
        </div>
      </div>
      <div class="sidebar-close">
        <span class="material-icons-outlined">close</span>
      </div>
    </div>
    <div class="sidebar-nav" data-simplebar="true">
      
        <!--navigation-->
        <ul v-show="!isLoading" class="metismenu" id="sidenav">
          <li v-if="is_admin">
            <a href="javascript:;" class="has-arrow">
              <div class="parent-icon"><i class="material-icons-outlined">home</i>
              </div>
              <div class="menu-title">{{$t('dashboard')}}</div>
            </a>
            <ul>
              <li><a href="/admin/products"><i class="material-icons-outlined">arrow_right</i>{{$t('plan_manager')}}</a>
              </li >
              <li><a href="/admin/users"><i class="material-icons-outlined">arrow_right</i>{{$t('user_manager')}}</a>
              </li>
              <li><a href="/admin/smartbox"><i class="material-icons-outlined">arrow_right</i>{{$t('smartbox_manager')}}</a>
              </li>
            </ul>
          </li>
          
          <li>
            <a href="javascript:;" class="has-arrow">
              <div  class="parent-icon"><i class="material-icons-outlined">inventory_2</i>
              </div>
              <div class="menu-title"><span v-if="is_admin">{{$t('subscriptions')}} </span><NuxtLink v-else to="/user/subscriptions">{{$t('my_subscriptions')}}</NuxtLink></div>
            </a>
            <ul v-if="is_admin">
              <li><a href="/user/subscriptions"><i class="material-icons-outlined">arrow_right</i>{{$t('my_subscriptions')}}</a>
              </li>
                          
            </ul>
          </li>

          <li >
            <a href="javascript:;" class="has-arrow">
              <div class="parent-icon"><i class="material-icons-outlined">key</i>
              </div>
              <div class="menu-title"><span v-if="is_admin">{{$t('add_keys')}}</span> <NuxtLink v-else to="/user/keys">{{$t('add_keys')}}</NuxtLink> </div>
            </a>
            <ul v-if="is_admin">
              <li><a href="/user/keys"><i class="material-icons-outlined">arrow_right</i>{{$t('add_keys')}}</a></li>
              <li v-if="is_admin"><a href="/user/access"><i class="material-icons-outlined">arrow_right</i>{{$t('access')}}</a></li>
              <!--li><a href="/user/fob"><i class="material-icons-outlined">arrow_right</i>Fob</a></li!-->
              <li v-if="is_admin"><a href="/user/organizations"><i class="material-icons-outlined">arrow_right</i>{{$t('organization')}}</a></li>
              
            </ul>
          </li>
          
          <li >
            <a href="javascript:;" class="has-arrow">
              <div class="parent-icon"><i class="material-icons-outlined">question_mark</i>
              </div>
              <div class="menu-title"><NuxtLink  to="/user/faq">{{$t('faq')}}</NuxtLink> </div>
            </a>
          </li>
          
         
          
          
          
         
         </ul>
        <!--end navigation-->
    </div>
    <div class="sidebar-bottom gap-4">
        <div v-show="!isLoading" class="dark-mode">
          <a href="javascript:;" class="footer-icon dark-mode-icon">
            <i class="material-icons-outlined">dark_mode</i>  
          </a>
        </div>
        <div class="dropdown dropup-center dropup dropdown-laungauge">
          <a class="dropdown-toggle dropdown-toggle-nocaret footer-icon" href="avascript:;" data-bs-toggle="dropdown"><img :src="lang?.icon" width="22" alt="">
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li  @click.prevent="switchLang('en')"><a class="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="/assets/images/county/01.png" width="20" alt=""><span class="ms-2">{{$t('english')}}</span></a>
            </li>
            <li  @click.prevent="switchLang('fr')"><a class="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="/assets/images/county/02.png" width="20" alt=""><span class="ms-2">{{$t('french')}}</span></a>
            </li>
           
           
          </ul>
        </div>

    </div>
</aside>
<!--end sidebar-->

    </div>
</template>
<script>
import store from "~/store/store";    
import {mapState,mapActions} from "vuex";
export default {
    name:"Sidebar.vue",
    store,
    data(){
      return {
        currentLocale: 'en',
        locales: [
          { code: 'en', iso: 'en-US', name: 'English' },
          { code: 'fr', iso: 'fr-FR', name: 'French' },
        ],
      }
    },
    computed:{
      ...mapState(['user','langs','lang','isLoading']),
      is_admin(){
        return this.user?.roles?.includes('ROLE_ADMIN')
      },
      is_colab(){
        return this.user?.roles?.includes('ROLE_COLAB')
      },

    },
    watch: {
      currentLocale(newLocale) {
        this.$i18n.setLocale(newLocale);
      }
    },
    methods:{
      ...mapActions(['fetchUser','setLang']),
      switchLang(lang){
        this.currentLocale=lang;
        this.setLang(lang);
      }
    },
    beforeMount(){
      //this.currentLocale='fr';
      this.setLang(this.$i18n.locale)

    }
}
</script>