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
            <input class="form-control px-5" type="search" placeholder="Search Key">
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
                  <tr v-for="key in keys" :key="key.id">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <div class="product-box">
                         
                        </div>
                        <div class="product-info">
                          <a href="javascript:;" class="product-title">{{key.id}}</a>
                          
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
                          <li><a class="dropdown-item " @click="publish(key)"  href="#">Publish</a></li>
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
                            <ValidationProvider rules="required" slim name="title"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="title" class="form-label">Title</label>
                                  <input class="form-control mb-3" id="title" :class="classes" type="text" v-model="key.title" placeholder="Title" aria-label="key title">
                                  <small id="title-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="description"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="description" class="form-label">Description</label> 
                                  <input class="form-control mb-3" id="description" :class="classes" type="text" v-model="key.description" placeholder="Description" aria-label="key description">
                                  <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="price"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="price" class="form-label">Price in $</label>
                                <input class="form-control mb-3" id="price" :class="classes" type="number" v-model="key.price" placeholder="Price" aria-label="key price in euro">
                                <small id="price-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="duration"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">Duration</label>
                                  <input class="form-control mb-3" id="duration" :class="classes" type="number" v-model="key.duration" placeholder="Duration" aria-label="key duration">
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
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
                            <ValidationProvider rules="required" slim name="title"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="title" class="form-label">Title</label>
                                  <input class="form-control mb-3" id="title" :class="classes" type="text" v-model="key.title" placeholder="Title" aria-label="key title">
                                  <small id="title-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="description"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="description" class="form-label">Description</label> 
                                  <input class="form-control mb-3" id="description" :class="classes" type="text" v-model="key.description" placeholder="Description" aria-label="key description">
                                  <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="price"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="price" class="form-label">Price in $</label>
                                <input class="form-control mb-3" id="price" :class="classes" type="number" v-model="key.price" placeholder="Price" aria-label="key price in euro">
                                <small id="price-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="duration"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">Duration</label>
                                  <input class="form-control mb-3" id="duration" :class="classes" type="number" v-model="key.duration" placeholder="Duration" aria-label="key duration">
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editKey)">Edit key</button>
                        </div>
                     </ValidationObserver>
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
        name:"KeyManager.vue",
        store,
        components:{ValidationProvider,ValidationObserver,Loading,ErrorModal},
        data(){
            return {
                key:{},
                file:null,
                display:false
            }
        },
        computed:{
            ...mapState(['keys','isLoading']),

            
        },
        methods:{
            ...mapActions(['create','getAll','del','update']),
            async submit(){
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            publish(key){
              this.key=key;              
            },
            edit(key){
              this.key=key;              
            },
            async editKey(){              
              this.key.duration=parseInt(this.key.duration)
              this.key.price=parseInt(this.key.price)
              let form =new FormData();
              form.append('file',this.file);              
              let response = await this.createPicture(form);
              this.key.pictures=["/api/pictures/"+response.data.id];
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