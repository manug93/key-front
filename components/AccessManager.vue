<template>
    <div v-if="!isLoading">
         <!--start main wrapper-->
  <main class="main-wrapper ">
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Access configuration</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Access</li>
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
            <input class="form-control px-5" type="search" placeholder="Search Access">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleLargeModal"><i class="bi bi-plus-lg me-2"></i>Add Access</button>
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
                    <th>Access ID</th>
                    <th>Name</th>
                    <th>Key Id</th>
                    <th>Heure debut</th>
                    <th>Heure fin</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in access" :key="item.id">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <div class="product-box">
                         
                        </div>
                        <div class="product-info">
                          <a href="#" @click.prevent="details(item)"  data-bs-toggle="modal" data-bs-target="#exampleLargeModalDetails" class="product-title">{{item?.id}}</a>
                          
                        </div>
                      </div>
                    </td>
                    <td>{{ item?.name }}</td>
                    
                    <td>
                        <p class="mb-0 product-category">{{ item?.key?.id }}</p>
                    </td>
                    <td>
                     {{item?.accessStartTime}}
                    </td>
                    <td>
                     {{item?.accessEndTime}}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item " @click="details(item)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalDetails" href="#">Details</a></li>
                          <li><a class="dropdown-item " @click="edit(item)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalEdit" href="#">Edit</a></li>
                          <li><a class="dropdown-item " @click="del(item)" href="#" >Delete</a></li>
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
                        <h5 class="modal-title">Add Access</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                          
                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">Create access</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="exampleLargeModalEdit" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Edit Access</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                          
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editAccess)">Edit access</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                
                <div class="modal fade" id="exampleLargeModalDetails" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Access Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>                    
                          <div class="modal-body">
                            <p>ID: {{ item?.id }}</p>
                            <p>Locale: {{ item?.locale }}</p>
                            <p>Suppress Guest Notifications: {{ item?.suppressGuestNotifications }}</p>
                            <p>Anonymous: {{ item?.anonymous }}</p>
                            <p>Return Reminder: {{ item?.returnReminder }}</p>
                            <p>Access End Time: {{ item?.accessEndTime }}</p>
                            <p>Access Start Date: {{ item?.accessStartDate }}</p>
                            <p>Require Photo Verification: {{ item?.requirePhotoVerification }}</p>
                            <p>Suppress Instructions: {{ item?.suppressInstructions }}</p>
                            <p>Access End Date: {{ item?.accessEndDate }}</p>
                            <p>End Date: {{ item?.endDate }}</p>
                            <p>Expired: {{ item?.expired }}</p>
                            <p>Start Date: {{ item?.startDate }}</p>
                            <p>Link Code: {{ item?.linkCode }}</p>
                            <p>Require Traveler ID: {{ item?.requireTravelerID }}</p>
                            <p>Booking Code: {{ item?.bookingCode }}</p>
                            <p>Name: {{ item?.name }}</p>
                            <p>User Mobile: {{ item?.user?.mobile }}</p>
                            <p>Access Code: {{ item?.accessCode }}</p>
                            <p>Allow Setup: {{ item?.allowSetup }}</p>
                            <p>Key ID: {{ item?.key?.id }}</p>
                            <p>Key Name: {{ item?.key?.name }}</p>
                            <p>Serial Number: {{ item?.key?.serialNumber }}</p>
                            <p>Default Access Start Time: {{ item?.key?.defaultAccessStartTime }}</p>
                            <p>Pickup Note: {{ item?.key?.pickupNote }}</p>
                            <p>Address Postal Code: {{ item?.key?.address?.postalCode }}</p>
                            <p>Address Longitude: {{ item?.key?.address?.longitude }}</p>
                            <p>Address City: {{ item?.key?.address?.city }}</p>
                            <p>Address Street: {{ item?.key?.address?.street }}</p>
                            <p>Address Unit: {{ item?.key?.address?.unit }}</p>
                            <p>Address StateProv: {{ item?.key?.address?.stateProv }}</p>
                            <p>Address Country: {{ item?.key?.address?.country }}</p>
                            <p>Address Latitude: {{ item?.key?.address?.latitude }}</p>
                            <p>Home Location ID: {{ item?.key?.homeLocation?.id }}</p>
                            <p>Home Location Name: {{ item?.key?.homeLocation?.name }}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                           
                        </div>
                   
                    </div>
                  </div>
                </div>

                
              
                
      <Loading></Loading>
      <ErrorModal></ErrorModal>
  <!--end main wrapper-->
    </div>

</template>
<script>
  import { baseUrl } from "~/store/tools";
	import store from "~/store/store";    
	import {mapState,mapActions} from "vuex";
  import Loading from './Loading.vue';
  import ErrorModal from './ErrorModal.vue';
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"AccessManager.vue",
        store,
        components:{ValidationProvider,ValidationObserver,Loading,ErrorModal},
        data(){
            return {
                item:{},
                file:null,
                display:false
            }
        },
        computed:{
            ...mapState(['access','isLoading']),

            
        },
        methods:{
            ...mapActions(['create','getAll','del','update']),
            async submit(){
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            details(item){
              this.item=item;              
            },
            edit(item){
              this.item=item;              
            },
            async editAccess(){              
              let payload={resource:'access',module:'api',id:this.access.id,data:this.access};
              this.update(payload).then(u=>{
                location.reload()
              })            
            },
            del(item){

            }

        },
        beforeMount(){
          this.getAll({resource:'access',module:'keycafe'})
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