<template>
  <div>
    <!--start header-->
    <header class="top-header">
      <nav class="navbar navbar-expand align-items-center gap-4">
        <div v-show="!isLoading" class="btn-toggle">
          <a href="javascript:;"><i class="material-icons-outlined">menu</i></a>
        </div>
        <div v-show="!isLoading" class="search-bar flex-grow-1">
          <div class="position-relative">
            <input class="form-control rounded-5 px-5 search-control d-lg-block d-none" type="text" placeholder="Search">
            <span
              class="material-icons-outlined position-absolute d-lg-block d-none ms-3 translate-middle-y start-0 top-50">search</span>
            <span
              class="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 search-close">close</span>
            <div class="search-popup p-3">
              <div class="card rounded-4 overflow-hidden">
                <div class="card-header d-lg-none">
                  <div class="position-relative">
                    <input class="form-control rounded-5 px-5 mobile-search-control" type="text" placeholder="Search">
                    <span
                      class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50">search</span>
                    <span
                      class="material-icons-outlined position-absolute me-3 translate-middle-y end-0 top-50 mobile-search-close">close</span>
                  </div>
                </div>
                <div class="card-body search-content">
                  <p class="search-title">Recent Searches</p>
                  <div class="d-flex align-items-start flex-wrap gap-2 kewords-wrapper">
                    <a href="javascript:;" class="kewords"><span>Angular Template</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                    <a href="javascript:;" class="kewords"><span>Dashboard</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                    <a href="javascript:;" class="kewords"><span>Admin Template</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                    <a href="javascript:;" class="kewords"><span>Bootstrap 5 Admin</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                    <a href="javascript:;" class="kewords"><span>Html eCommerce</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                    <a href="javascript:;" class="kewords"><span>Sass</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                    <a href="javascript:;" class="kewords"><span>laravel 9</span><i
                        class="material-icons-outlined fs-6">search</i></a>
                  </div>
                  <hr>
                  <p class="search-title">Tutorials</p>
                  <div class="search-list d-flex flex-column gap-2">
                    <div class="search-list-item d-flex align-items-center gap-3">
                      <div class="list-icon">
                        <i class="material-icons-outlined fs-5">play_circle</i>
                      </div>
                      <div class="">
                        <h5 class="mb-0 search-list-title ">Wordpress Tutorials</h5>
                      </div>
                    </div>
                    <div class="search-list-item d-flex align-items-center gap-3">
                      <div class="list-icon">
                        <i class="material-icons-outlined fs-5">shopping_basket</i>
                      </div>
                      <div class="">
                        <h5 class="mb-0 search-list-title">eCommerce Website Tutorials</h5>
                      </div>
                    </div>

                    <div class="search-list-item d-flex align-items-center gap-3">
                      <div class="list-icon">
                        <i class="material-icons-outlined fs-5">laptop</i>
                      </div>
                      <div class="">
                        <h5 class="mb-0 search-list-title">Responsive Design</h5>
                      </div>
                    </div>
                  </div>

                  <hr>
                  <p class="search-title">Members</p>

                  <div class="search-list d-flex flex-column gap-2">
                    <div class="search-list-item d-flex align-items-center gap-3">
                      <div class="memmber-img">
                        <img src="/assets/images/avatars/1.png" width="32" height="32" class="rounded-circle" alt="">
                      </div>
                      <div class="">
                        <h5 class="mb-0 search-list-title ">Andrew Stark</h5>
                      </div>
                    </div>

                    <div class="search-list-item d-flex align-items-center gap-3">
                      <div class="memmber-img">
                        <img src="/assets/images/avatars/2.png" width="32" height="32" class="rounded-circle" alt="">
                      </div>
                      <div class="">
                        <h5 class="mb-0 search-list-title ">Snetro Jhonia</h5>
                      </div>
                    </div>

                    <div class="search-list-item d-flex align-items-center gap-3">
                      <div class="memmber-img">
                        <img src="/assets/images/avatars/3.png" width="32" height="32" class="rounded-circle" alt="">
                      </div>
                      <div class="">
                        <h5 class="mb-0 search-list-title">Michle Clark</h5>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="card-footer text-center bg-transparent">
                  <a href="javascript:;" class="btn w-100">See All Search Results</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul v-show="!isLoading" class="navbar-nav gap-1 nav-right-links align-items-center">
         
          <li class="nav-item dropdown">
            <a href="javascript:;" class="dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
              <img src="/assets/images/avatars/default.png" class="rounded-circle p-1 border" width="45" height="45">
            </a>
            <div class="dropdown-menu dropdown-user dropdown-menu-end shadow">
              <a class="dropdown-item  gap-2 py-2" href="javascript:;">
                <div class="text-center">
                  <img src="/assets/images/avatars/default.png" class="rounded-circle p-1 shadow mb-3" width="90" height="90"
                    alt="">
                  <h5 class="user-name mb-0 fw-bold">{{user?.firstname}}, {{user?.lastname}}</h5>
                </div>
              </a>
              
              <hr class="dropdown-divider">
              <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="/logout"><i
                  class="material-icons-outlined">power_settings_new</i>{{$t('sign_out')}}</a>
            </div>
          </li>
        </ul>

      </nav>
    </header>
    <!--end top header-->
  </div>
</template>
<script>
//import '~/static/assets/js/jquery.min.js'
import store from '~/store/store';
import {mapActions,mapState} from 'vuex';
export default {
  name: "Navbar.vue",
  store:store,
  data() {
    return {

    };
  },
  computed:{
    ...mapState(['user','auth','isLoading'])
  },
  methods: {
    ...mapActions(['fetchUser','fetchToken'])
  },
  async beforeMount(){
    if(!this.auth){
      let response = await this.fetchUser();
      if (response?.status===401){      
        this.$router.push("/login")
      }
    }
    
  },
  created() {

  },
  // Optionally, you can call loadScripts in mounted() or a custom hook
  mounted() {
    //this.loadScripts(); // Uncomment to load scripts on component mount
    console.log("Loading");
    //this.$loadFiles.loadCSS('/path/to/style.css');
  },
};
</script>
<style></style>
