<template>
    <div >
         <!--start main wrapper-->
  <main class="main-wrapper " >
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Organization Membership</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Organization</li>
            </ol>
          </nav>
        </div>
        <div class="ms-auto">
          <div class="btn-group">
            <button type="button" class="btn btn-primary">Settings</button>
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
        <a href="javascript:;"><span class="me-1">All</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">Published</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">Drafts</span><span class="text-secondary">()</span></a>
      </div>

      <div class="row g-3">
        <div class="col-auto">
          <div class="position-relative">
            <input class="form-control px-5" type="search" placeholder="Search Organization">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleLargeModal"><i class="bi bi-plus-lg me-2"></i>Add Member</button>
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
                    <th> ID</th>
                    <th>Code</th>
                    <th>Organization</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="membership,id in list" :key="membership.id">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <div class="product-box">
                         
                        </div>
                        <div class="product-info">
                          <a href="javascript:;" class="product-title">{{membership?.id }}</a>
                          
                        </div>
                      </div>
                    </td>
                    <td>{{ membership?.code }}</td>
                    <td>{{ membership?.user.organization }}</td>
                    
                    <td>
                      {{ membership?.user?.firstName }}
                    </td>
                    <td>
                      {{ membership?.user?.lastName }}
                    </td>
                    <td>
                      {{ membership?.user?.type }}
                    </td>
                    <td>
                      {{ membership?.user?.email }}
                    </td>
                    <td>
                      {{ membership?.user?.mobile }}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item " @click="remove(membership)" href="#" >Delete</a></li>
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
                        <h5 class="modal-title">Add Membership</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                          <ValidationProvider rules="required" slim name="code" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="code" class="form-label">Code</label>
                                <input class="form-control mb-3" id="code" :class="classes" type="text" v-model="membership.code" placeholder="Code" aria-label="organization code">
                                <small id="code-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>

                        

                        <ValidationProvider rules="required" slim name="firstName" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="firstName" class="form-label">First Name</label>
                                <input class="form-control mb-3" id="firstName" :class="classes" type="text" v-model="membership.user.firstName" placeholder="First Name" aria-label="organization first name">
                                <small id="firstName-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider rules="required" slim name="lastName" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input class="form-control mb-3" id="lastName" :class="classes" type="text" v-model="membership.user.lastName" placeholder="Last Name" aria-label="organization last name">
                                <small id="lastName-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider rules="required" slim name="contactEmail" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="contactEmail" class="form-label">Contact Email</label>
                                <input class="form-control mb-3" id="contactEmail" :class="classes" type="email" v-model="membership.user.contactEmail" placeholder="Contact Email" aria-label="organization contact email">
                                <small id="contactEmail-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="" slim name="sendWelcomeEmail"  v-slot="{classes,errors}">
                            <div class="field">
                              <input class="form-check-input"  id="sendWelcomeEmail" :class="classes" v-model="membership.sendWelcomeEmail"  aria-label="membership sendWelcomeEmail" type="checkbox" >
									            <label class="form-check-label" for="sendWelcomeEmail">Send Welcome Email</label>                              
                              <small id="sendWelcomeEmail-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>
                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">Create membership</button>
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
  import {OrganizationMembership} from "~/store/models"
	import {mapState,mapActions} from "vuex";
  import ErrorModal from './ErrorModal.vue';
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"OrganizationManager.vue",
        store:store,
        components:{ValidationProvider,ValidationObserver,ErrorModal},
        data(){
            return {
                organization:{},
                membership:new OrganizationMembership({}),
                file:null,
                display:false
            }
        },
        computed:{
            ...mapState(['organizationMemberships','isLoading']),           
            list(){              
              return  this.query?this.searchResults.map(r=>r.item):this.organizationMemberships
            }, 
            fuse(){
              return  new this.$fuse(this.subscriptions?.products?.data, { keys: ['id','customer.email','plan.product.name'] })
            },
            searchResults(){
              return this.fuse.search(this.query)
            }


            
        },
        methods:{
            ...mapActions(['create','getAll','del','update']),
            async submit(){
              this.create({resource:'organizationMemberships',module:'keycafe',data:this.membership})
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            remove(membership){
              this.del({resource:'organizationMemberships',module:'keycafe',id:membership.id})

            },

        },
         beforeMount(){
          this.getAll({resource:'organizationMemberships',module:'keycafe'})
          this.membership=new OrganizationMembership({})
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