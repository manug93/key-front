<template>
    <div v-if="display" >
         <!--start main wrapper-->
        <main class="main-wrapper ">
          <div class="main-content">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div class="breadcrumb-title pe-3">{{$t('user_configuration')}}</div>
              <div class="ps-3">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{$t('users')}}</li>
                  </ol>
                </nav>
              </div>
              <div class="ms-auto">
                <div class="btn-group">
                  <button type="button" class="btn btn-primary">{{$t('settings')}}</button>
                  <button type="button" class="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"> <span class="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end"> <a class="dropdown-item"
                      href="javascript:;">Action</a>
                    <a class="dropdown-item" href="javascript:;">Another action</a>
                    <a class="dropdown-item" href="javascript:;">Something else here</a>
                    <div class="dropdown-divider"></div> <a class="dropdown-item" href="javascript:;">Separated link</a>
                  </div>
                </div>
              </div>
            </div>
            <!--end breadcrumb-->

            <div class="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-medium flex-wrap font-text1">
              <a href="javascript:;"><span class="me-1">{{$t('all')}}</span><span class="text-secondary">({{users.length}})</span></a>
              <a href="javascript:;"><span class="me-1">{{$t('admins')}}</span><span class="text-secondary">({{ admins }})</span></a>
              <a href="javascript:;"><span class="me-1">{{$t('colabs')}}</span><span class="text-secondary">({{ collabs }})</span></a>
              <a href="javascript:;"><span class="me-1">{{$t('clients')}}</span><span class="text-secondary">({{ clients }})</span></a>
            </div>

            <div class="row g-3">
              <div class="col-auto">
                <div class="position-relative">
                  <input class="form-control px-5" type="search" placeholder="Search User">
                  <span
                    class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
                </div>
              </div>
              
              <div class="col-auto">
                <div class="d-flex align-items-center gap-2 justify-content-lg-end">
                  <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleLargeModal"><i class="bi bi-plus-lg me-2"></i>{{$t('add_user')}}</button>
                </div>
              </div>
            </div><!--end row-->

            <div class="card mt-4">
              <div class="card-body">
                <div class="product-table">
                  <div class="table-responsive white-space-nowrap">
                    <table class="table align-middle">
                      <thead class="table-light">
                        <tr>
                          <th>
                            <input class="form-check-input" type="checkbox">
                          </th>
                          <th>{{$t('email')}}</th>
                          <th>{{$t('firstname')}}</th>
                          <th>{{$t('lastname')}}</th>
                          <th>{{$t('creation_date')}}</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="current_user in users" :key="current_user.id">
                          <td>
                            <input class="form-check-input" type="checkbox">
                          </td>
                          <td>
                            <div class="d-flex align-items-center gap-3">
                              <div class="product-box">
                                
                              </div>
                              <div class="product-info">
                                <a href="javascript:;" class="product-title">{{current_user.email}}</a>
                                
                              </div>
                            </div>
                          </td>
                          <td>{{ current_user.firstname }}</td>
                          
                          <td>
                              {{ current_user.lastname }}
                          </td>
                          <td>
                          {{current_user.createdAt}}
                          </td>
                          <td>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                                type="button" data-bs-toggle="dropdown">
                                <i class="bi bi-three-dots"></i>
                              </button>
                              <ul class="dropdown-menu">
                                <li><a class="dropdown-item" @click="edit(current_user)" data-bs-toggle="modal" data-bs-target="#exampleLargeEditModal" href="#">{{$t('edit')}}</a></li>
                                <li><a class="dropdown-item" href="#" @click="del(current_user)">{{$t('delete')}}</a></li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </main>
  <div class="modal fade" id="exampleLargeModal" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('add_user')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                            <ValidationProvider rules="required|email" slim name="email"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="email" class="form-label">{{$t('email')}}</label>
                                  <input class="form-control mb-3" id="email" :class="classes" type="text" v-model="current_user.email" placeholder="Email" aria-label="user email">
                                  <small id="email-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="firstname"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="firstname" class="form-label">{{$t('firstname')}}</label> 
                                  <input class="form-control mb-3" id="firstname" :class="classes" type="text" v-model="current_user.firstname" placeholder="Firstname" aria-label="user firstname">
                                  <small id="firstname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="lastname"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="lastname" class="form-label">{{$t('lastname')}}</label>
                                <input class="form-control mb-3" id="lastname" :class="classes" type="text" v-model="current_user.lastname" placeholder="Lastname" aria-label="user lastname ">
                                <small id="lastname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="password"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="password" class="form-label">{{$t('password')}}</label>
                                <input class="form-control mb-3" id="password" :class="classes" type="password" v-model="current_user.password" placeholder="Password" aria-label="user password ">
                                <small id="password-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="role"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <div class="mb-4">
                                  <label for="role" class="form-label">{{$t('role')}}</label>
                                    <select class="form-select" id="role" data-placeholder="Choose one role"  v-model="current_user.roles"  :class="classes" placeholder="Roles" aria-label="user roles">
                                      <option v-for="value,id in default_roles" :value="[value]" :key="id">{{value}} </option>
                                    </select>                                                                     
                                    <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                  </div>
                                  
                                </div>
                             </ValidationProvider>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">{{$t('add_user')}}</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="exampleLargeEditModal" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('edit_user')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                            <ValidationProvider rules="email" slim name="email"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="email-edit" class="form-label">{{$t('email')}}</label>
                                  <input class="form-control mb-3" id="email-edit" :class="classes" type="text" v-model="current_user.email" placeholder="Email" aria-label="user email">
                                  <small id="email-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="" slim name="firstname"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="firstname-edit" class="form-label">{{$t('fristname')}}</label> 
                                  <input class="form-control mb-3" id="firstname-edit" :class="classes" type="text" v-model="current_user.firstname" placeholder="Firstname" aria-label="user firstname">
                                  <small id="firstname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="" slim name="lastname"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="lastname-edit" class="form-label">{{$t('lastname')}}</label>
                                <input class="form-control mb-3" id="lastname-edit" :class="classes" type="text" v-model="current_user.lastname" placeholder="Lastname" aria-label="user lastname ">
                                <small id="lastname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="" slim name="password"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="password-edit" class="form-label">{{$t('password')}}</label>
                                <input class="form-control mb-3" id="password-edit" :class="classes" type="password" v-model="current_user.password" placeholder="Password" aria-label="user password ">
                                <small id="password-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="" slim name="role"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <div class="mb-4">
                                  <label for="role-edit" class="form-label">{{$t('role')}}</label>
                                    <select class="form-select" id="role-edit" data-placeholder="Choose one role"  v-model="current_user.roles"  :class="classes" placeholder="Roles" aria-label="user roles">
                                      <option v-for="value,id in default_roles" :value="[value]" :key="id">{{value}} </option>
                                    </select>                                                                     
                                    <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                  </div>
                                  
                                </div>
                             </ValidationProvider>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(updateUser)">{{$t('edit_user')}}</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>
                
      <ErrorModal></ErrorModal>
  <!--end main wrapper-->
    </div>

</template>
<script>

  import { baseUrl } from "~/store/tools";
	import store from "~/store/store";    
	import { mapState, mapActions } from "vuex";
  import ErrorModal from './ErrorModal.vue';
	import { ValidationProvider, ValidationObserver } from 'vee-validate';
    export default {
        name:"UserManager.vue",
        store:store,
        components:{ValidationProvider,ValidationObserver,ErrorModal},
        data(){
            return {
                current_user:{
                  roles:[]
                },
                display:false,
                default_roles:["ROLE_ADMIN","ROLE_COLAB"],
                file:null
            }
        },
        computed:{
            ...mapState(['users']),
            admins(){
              let adm = this.users.filter(u=>{return u.roles.includes("ROLE_ADMIN")});
              return adm.length;
            },
            collabs(){
              let col = this.users.filter(u=>{return u.roles.includes("ROLE_COLAB")});
              return col.length;
            },
            clients(){
              let cli = this.users.filter(u=>{return u.roles.includes("ROLE_USER")});
              return cli.length;
            }
            
        },
        methods:{
            ...mapActions(['createUser','fetchUsers','deleteUser','update']),
            async submit(){
                let form =new FormData();
                this.createUser(this.current_user).then((e)=>{
                  location.reload()
                })
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            edit(current_user){
              this.current_user=current_user;              
            },
            updateUser(){
              let payload={resource:'users',module:'api',id:this.current_user.id,data:this.current_user};
              this.update(payload);
            },
            del(current_user){
              this.deleteUser(current_user.id).then(e=>{
                  this.fetchUsers()
              })
            }            

        },
        async beforeMount(){
          let response = await this.fetchUsers();
          this.display=true;
          console.log(response.data);
        }
    }
</script>
<style scoped>
    .table-responsive {
        min-height: 500px;
    }
    .dropdown-menu{
        z-index: 12222;
    }
</style>