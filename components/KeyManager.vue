<template>
  <div v-if="!isLoading">
         <!--start main wrapper-->
  <main class="main-wrapper ">
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">{{$t('keys_configuration')}}</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{$t('keys')}}</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->

      <div class="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-medium flex-wrap font-text1">
        <a href="javascript:;"><span class="me-1">{{$t('all')}}</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">{{$t('published')}}</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">{{$t('drafts')}}</span><span class="text-secondary">()</span></a>
      </div>

      <div class="row g-3">
        <div class="col-auto">
          <div class="position-relative">
            <input class="form-control px-5" type="search" v-model="query" :placeholder="$t('search_key')">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleLargeModalCreate" @click="createKeyForm"><i class="bi bi-plus-lg me-2"></i>{{$t('add_key')}}</button >
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
                    <th>{{$t('key_id')}}</th>
                    <th>{{$t('name')}}</th>
                    <th>{{$t('organization')}}</th>
                    <th>{{$t('serial_number')}}</th>
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
                    <td>{{ key.name }}</td>
                    
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
                          <li><a class="dropdown-item " @click="details(key)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalDetails" href="#">{{$t('details')}}</a></li>
                          <li><a class="dropdown-item " @click="edit(key)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalEdit" href="#">{{$t('link_to_fob')}}</a></li>
                          <li><a class="dropdown-item " @click="remove(key)" href="#" >{{$t('delete')}}</a></li>
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
    

                <div class="modal fade" id="exampleLargeModalEdit" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('edit_key')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                            
                        <ValidationProvider rules="required" slim name="serialNumber" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="serialNumber" class="form-label">{{$t('serial_number')}}</label>
                                <input class="form-control mb-3" id="serialNumber" :class="classes" type="text" v-model="key.serialNumber" placeholder="Serial Number" aria-label="key serial number">
                                <small id="serialNumber-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editKey)">{{$t('edit_key')}}</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="exampleLargeModalCreate" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('add_key')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                            
                        <ValidationProvider rules="required" slim name="name" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="name" class="form-label">{{$t('name')}}</label>
                                <input class="form-control mb-3" id="name" :class="classes" type="text" v-model="key.name" :placeholder="$t('key_name')" aria-label="key  name">
                                <small id="name-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="" slim name="description" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="description" class="form-label">{{$t('description')}}</label>
                                <input class="form-control mb-3" id="description" :class="classes" type="text" v-model="key.description" placeholder="Description" aria-label="key  description">
                                <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="" slim name="notes" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="notes" class="form-label">{{$t('notes')}}</label>
                                <input class="form-control mb-3" id="notes" :class="classes" type="text" v-model="key.notes" placeholder="Notes" aria-label="key notes">
                                <small id="notes-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>
                        
                        <ValidationProvider rules="" slim name="pickupNote" v-slot="{ classes, errors }">
                            <div class="field">
                                <label for="pickupNote" class="form-label">{{$t('pickup_note')}}</label>
                                <input class="form-control mb-3" id="pickupNote" :class="classes" type="text" v-model="key.pickupNote" placeholder="Pickup Note" aria-label="key  pickupNote">
                                <small id="pickupNote-help" class="p-invalid red-color">{{ errors[0] }}</small>
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="required" slim name="smartbox" v-slot="{classes,errors}">  
                        <div class="row">
                          <div class="field col-8">
                              <div class="mb-4">
                                  <label for="subscription" class="form-label">{{$t('subscription')}}</label>
                                  <select class="form-select" id="subscription" @change="setSubscription" data-placeholder="Choose one subscription"  v-model="key.subscription"  :class="classes" placeholder="Subscription" aria-label="user subscription">
                                      <option v-for="value,id in subscriptions" :value="value" :key="value.id">{{value.stripeId}}  left bins : {{value?.leftBins}}</option>
                                  </select>                                                                   
                                  <small id="subscription-help" class="p-invalid red-color">{{ errors[0] }}</small>
                              </div>                                                    
                          </div>
                        </div>
                      </ValidationProvider>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSubmit(submit)">{{$t('create_key')}}</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                
                <div class="modal fade" id="exampleLargeModalDetails" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('key_details')}} </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>                    
                          <div class="modal-body">
                          <p>ID: {{ keydetails?.id }}</p>
                          <p>{{$t('code')}}: {{ keydetails?.code }}</p>
                          <p>{{$t('name')}}: {{ keydetails?.name }}</p>
                          <p>{{$t('owner')}}: {{ keydetails?.owner?.firstName }} {{ keydetails?.owner?.lastName }}</p>
                          <p>{{$t('organization')}}: {{ keydetails?.owner?.organization }}</p>
                          <p>{{$t('current_location')}}: {{ keydetails?.currentLocation?.name }}</p>
                          <p>{{$t('home_location')}}: {{ keydetails?.homeLocation?.name }}</p>
                          <p>{{$t('virtual')}}: {{ keydetails?.virtual ? 'Yes' : 'No' }}</p>
                          <p>{{$t('serial_number')}}: {{ keydetails?.serialNumber }}</p>
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
                keydetails:{},
                file:null,
                display:false,
                subscriptions:[],
                subscription:{},
                query:"",
            }
        },
        computed:{
            ...mapState(['keys','isLoading','user','mybins']),
            fuse(){
              return  new this.$fuse(this.keys, { keys: ['id','serialNumber','name','owner.firstName','owner.lastName'] })
            },
            searchResults(){          
              return this.fuse.search(this.query)
            },
            list(){
              if(this.is_admin || this.is_colab){
                return this.query?this.searchResults.map(r=>r.item):this.keys;
              }
              let res = this.query?this.searchResults.map(r=>r.item):this.keys;
              if(this.mybins?.length===0){
                return [];
              }
              let data = Object.values(res).filter(key => this.mybins?.some(bin => bin.keyId === key.id));
              //let data = Object.values(res).filter((e)=>e?.owner?.email===this?.user?.email) || [];
              //let data = res?.filter((e)=>e?.owner?.email===this?.user?.email) || []
              return data;
            },
            is_admin(){
              return this.user?.roles?.includes('ROLE_ADMIN')
            },
            is_colab(){
              return this.user?.roles?.includes('ROLE_COLAB')
            },
            mykeys(){              
              return  this.list?.filter(key => this.mybins?.some(bin => bin.keyId === key.id));
            }

            
        },
        methods:{
            ...mapActions(['create','getAll','del','update','getById']),
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
                
              })            
            },
            remove(key){
              this.del({resource:'keys',module:'keycafe',id:key.id})
            },
            async submit(){
               let data={...this.key,bin:{box:this.key.subscription.smartbox,subscription:this.key.subscription.id}}
               data.name=this.key.name +" /"+this.user.email
               this.create({resource:'keys',module:'keycafe',data:data}).then((e)=>{
                  
                })
            },
            async createKeyForm(){
             let user = JSON.parse(localStorage.getItem('user'))
             
            },
            setSubscription(event){
              //console.log(this.key.subscription);
            },
            pageLoaded() {
              // Code to execute when the page is fully loaded
              //window.alert('Page completely loaded!');
            }

        },
        async beforeMount(){
          await this.getAll({resource:'keys',module:'keycafe'});
          await this.getAll({resource:'mybins',module:'api'});
          let res = await this.getAll({resource:'clients',module:'stripe/subscriptions'});
          this.subscriptions=Object.values(res.subscriptions);
          
        },
        beforeDestroy() {
          // Make sure to remove the event listener to prevent memory leaks
          window.removeEventListener('load', this.pageLoaded);
        }, mounted() {
          // Code to execute after the component is mounted
          window.addEventListener('load', this.pageLoaded);
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