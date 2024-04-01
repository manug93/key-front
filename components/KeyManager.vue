<template>
    <div v-if="!isLoading">
         <!--start main wrapper-->
  <main class="main-wrapper ">
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Keys configuration</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Keys</li>
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
            <input class="form-control px-5" type="search" v-model="query" placeholder="Search Key">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleLargeModal"><i class="bi bi-plus-lg me-2"></i>Add Key</button>
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
                    <th>Key ID</th>
                    <th>Code</th>
                    <th>Organization</th>
                    <th>Serial Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="key in list" :key="key.id">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <div class="product-box">
                         
                        </div>
                        <div class="product-info">
                          <a href="#" @click="details(key)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalDetails" class="product-title">{{key.id}}</a>
                          
                        </div>
                      </div>
                    </td>
                    <td>{{ key.code }}</td>
                    
                    <td>
                        <p class="mb-0 product-category">{{ key.organization.id }}</p>
                    </td>
                    <td>
                     {{key.serialNumber}}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item " @click="details(key)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalDetails" href="#">Details</a></li>
                          <li><a class="dropdown-item " @click="edit(key)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalEdit" href="#">Edit</a></li>
                          <li><a class="dropdown-item " @click="del(key)" href="#" >Delete</a></li>
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
                        <h5 class="modal-title">Add Key</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                          <ValidationProvider rules="required" slim name="name"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="name" class="form-label">Name</label>
                              <input class="form-control mb-3" id="name" :class="classes" type="text" v-model="key.name" placeholder="Key Name" aria-label="key name">
                              <small id="name-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <ValidationProvider rules="" slim name="description"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="description" class="form-label">Description</label>
                              <textarea class="form-control mb-3" id="description" :class="classes" rows="3" v-model="key.description" placeholder="Key Description" aria-label="key description"></textarea>
                              <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <div class="field">
                            <label for="serialNumber" class="form-label">Serial Number</label>
                            <input class="form-control mb-3" id="serialNumber" type="text" v-model="key.serialNumber" placeholder="Serial Number" aria-label="key serial number">
                          </div>

                          <ValidationProvider rules="" slim name="notes"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="notes" class="form-label">Notes</label>
                              <textarea class="form-control mb-3" id="notes" :class="classes" rows="3" v-model="key.notes" placeholder="Additional Notes" aria-label="key notes"></textarea>
                              <small id="notes-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <ValidationProvider rules="" slim name="pickupNote"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="pickupNote" class="form-label">Pickup Note</label>
                              <textarea class="form-control mb-3" id="pickupNote" :class="classes" rows="3" v-model="key.pickupNote" placeholder="Instructions for Pickup" aria-label="key pickup note"></textarea>
                              <small id="pickupNote-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <h3>Address</h3>
                          <ValidationProvider rules="" slim name="street"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="street" class="form-label">Street</label>
                              <input class="form-control mb-3" id="street" :class="classes" type="text" v-model="key.address.street" placeholder="Street Address" aria-label="key street address">
                              <small id="street-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>
                          <ValidationProvider rules="" slim name="unit"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="unit" class="form-label">Unit</label>
                              <input class="form-control mb-3" id="unit" type="text" v-model="key.address.unit" placeholder="Unit Number (optional)" aria-label="key unit number">
                            </div>
                        </ValidationProvider>

                          <ValidationProvider rules="" slim name="city"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="city" class="form-label">City</label>
                              <input class="form-control mb-3" id="city" :class="classes" type="text" v-model="key.address.city" placeholder="City" aria-label="key city">
                              <small id="city-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <ValidationProvider rules="" slim name="stateProv"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="stateProv" class="form-label">StateProv</label>
                              <input class="form-control mb-3" id="stateProv" :class="classes" type="text" v-model="key.address.stateProv" placeholder="StateProv" aria-label="key stateProv">
                              <small id="stateProv-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <ValidationProvider rules="" slim name="country"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="country" class="form-label">Country</label>
                              <input class="form-control mb-3" id="country" :class="classes" type="text" v-model="key.address.country" placeholder="Country" aria-label="key country">
                              <small id="country-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <ValidationProvider rules="" slim name="postalCode"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="postalCode" class="form-label">PostalCode</label>
                              <input class="form-control mb-3" id="postalCode" :class="classes" type="text" v-model="key.address.postalCode" placeholder="PostalCode" aria-label="key postalCode">
                              <small id="postalCode-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>
                             
                          <ValidationProvider rules="" slim name="homeLocation"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="homeLocation" class="form-label">HomeLocation</label>
                              <input class="form-control mb-3" id="homeLocation" :class="classes" type="text" v-model="key.homeLocation.id" placeholder="HomeLocation" aria-label="key homeLocation">
                              <small id="homeLocation-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>


                          <ValidationProvider rules="" slim name="virtual"  v-slot="{classes,errors}">
                            <div class="field">
                              <input class="form-check-input"  id="virtual" :class="classes" v-model="key.virtual" placeholder="Virtual" aria-label="key virtual" type="checkbox" >
									            <label class="form-check-label" for="virtual">Virtual</label>                              
                              <small id="virtual-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                          <ValidationProvider rules="" slim name="code"  v-slot="{classes,errors}">
                            <div class="field">
                              <label for="code" class="form-label">Code</label>
                              <input class="form-control mb-3" id="code" :class="classes" type="text" v-model="key.code" placeholder="Code" aria-label="key code">
                              <small id="code-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                          </ValidationProvider>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">Create key</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="exampleLargeModalEdit" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Edit Key</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editKey)">Edit key</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                
                <div class="modal fade" id="exampleLargeModalDetails" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Key Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>                    
                          <div class="modal-body">
                          <p>ID: {{ keydetails?.id }}</p>
                          <p>Code: {{ keydetails?.code }}</p>
                          <p>Name: {{ keydetails?.name }}</p>
                          <p>Owner: {{ keydetails?.owner?.firstName }} {{ keydetails?.owner?.lastName }}</p>
                          <p>Organization: {{ keydetails?.owner?.organization }}</p>
                          <p>Current Location: {{ keydetails?.currentLocation?.name }}</p>
                          <p>Home Location: {{ keydetails?.homeLocation?.name }}</p>
                          <p>Virtual: {{ keydetails?.virtual ? 'Yes' : 'No' }}</p>
                          <p>Serial Number: {{ keydetails?.serialNumber }}</p>
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
  import {Key} from "~/store/models";
  import Loading from './Loading.vue';
  import ErrorModal from './ErrorModal.vue';
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"KeyManager.vue",
        store,
        components:{ValidationProvider,ValidationObserver,Loading,ErrorModal},
        data(){
            return {
                key:new Key(),
                keydetails:{},
                file:null,
                display:false,
                query:"",
            }
        },
        computed:{
            ...mapState(['keys','isLoading']),
            fuse(){
              return  new this.$fuse(this.keys, { keys: ['id','serialNumber','name','owner.firstName','owner.lastName'] })
            },
            searchResults(){
              return this.fuse.search(this.query)
            },
            list(){
              return this.query?this.searchResults.map(r=>r.item):this.keys
            }

            
        },
        methods:{
            ...mapActions(['create','getAll','del','update']),
            async submit(){
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            details(key){
              this.keydetails=key;              
            },
            edit(key){
              this.key=key;              
            },
            async editKey(){              
              let payload={resource:'keys',module:'api',id:this.key.id,data:this.key};
              this.update(payload).then(u=>{
                location.reload()
              })            
            },
            del(key){

            }

        },
        beforeMount(){
          this.getAll({resource:'keys',module:'keycafe'})
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