<template>
    <div>
         <!--start main wrapper-->
  <main class="main-wrapper ">
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">{{$t('smartbox_configuration')}}</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{$t('smartboxes')}}</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->

      <div class="row g-3">
        <div class="col-auto">
          <div class="position-relative">
            <input class="form-control px-5" type="search" :placeholder="$t('search_smartbox')">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
         <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <button class="btn btn-primary px-4"  data-bs-toggle="modal" data-bs-target="#exampleLargeModal"><i class="bi bi-plus-lg me-2"></i>{{$t('add_smartbox')}}</button>
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
                    <th>{{$t('smartbox_id')}}</th>
                    <th>{{$t('number_of_bins')}}</th>
                    <th>{{$t('creation_date')}}</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="smartbox in smartboxes" :key="smartbox.id">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    
                    <td>{{ smartbox?.keycafeId }}</td>
                    <td>{{ smartbox?.binNumber }}</td>
                    <td>
                     {{smartbox?.createdAt}}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item " @click="edit(smartbox)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalEdit" href="#">{{$t('edit')}}</a></li>
                          <li><a class="dropdown-item " @click="remove(smartbox)" href="#" >{{$t('delete')}}</a></li>
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
                        <h5 class="modal-title">{{$t('edit_smartbox')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit }">
                        <div class="modal-body">                        
                             
                             <ValidationProvider rules="required" slim name="number"  v-slot="{errors}">  
                                <div class="field">
                                  <label for="number" class="form-label">{{$t('smartbox_id')}}</label>
                                  <input class="form-control mb-3" id="number" v-model="smartbox.keycafeId"  type="number" >
                                  <small id="number-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	

                              <ValidationProvider rules="required" slim name="duration"  v-slot="{errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">{{$t('number_of_bins')}}</label>
                                  <input class="form-control mb-3" id="duration" v-model="smartbox.binNumber"  type="number" >
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">{{$t('add_smartbox')}}</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="exampleLargeModalEdit" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('edit_smartbox')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit }">
                        <div class="modal-body">                        
                             
                             <ValidationProvider rules="required" slim name="number"  v-slot="{errors}">  
                                <div class="field">
                                  <label for="number" class="form-label">{{$t('smartbox_id')}}</label>
                                  <input class="form-control mb-3" id="number" v-model="smartbox.keycafeId"  type="number" >
                                  <small id="number-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	

                              <ValidationProvider rules="required" slim name="duration"  v-slot="{errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">{{$t('number_of_bins')}}</label>
                                  <input class="form-control mb-3" id="duration" v-model="smartbox.binNumber"  type="number" >
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editSmartbox)">{{$t('edit_smartbox')}}</button>
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
	import {mapState,mapActions} from "vuex";
  import ErrorModal from './ErrorModal.vue';
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"SmartboxManager.vue",
        store,
        components:{ValidationProvider,ValidationObserver,ErrorModal},
        data(){
            return {
                smartbox:{},
                file:null,
            }
        },
        computed:{
            ...mapState(['smartboxes']),
            drafts(){
              let drafts=this.smartboxes.filter(e=>e.status===undefined);
              return drafts.length;
            },
            published(){
              let published=this.smartboxes.filter(e=>e.status==='PUBLISHED');
              return published.length;
            }

            
        },
        methods:{
            ...mapActions(['create','del','getAll','update']),
            async submit(){
                this.smartbox.binNumber=parseInt(this.smartbox.binNumber);
                await this.create({module:"api",resource:"smartboxes",data:this.smartbox});
            },
            selectPicture(event){
              this.file=event.target.files[0];
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            publish(smartbox){
              this.smartbox=smartbox;              
            },
            edit(smartbox){
              this.smartbox=smartbox;              
            },
            async editSmartbox(){              
              this.smartbox.binNumber=parseInt(this.smartbox.binNumber);   
              this.smartbox.id=parseInt(this.smartbox.id);   
              let payload={
                resource:'smartboxes',
                module:'api',
                id:this.smartbox.id,
                data:{
                  id:this.smartbox.id,
                  binNumber:parseInt(this.smartbox.binNumber),
                  keycafeId:this.smartbox.keycafeId
                }
              };
              await this.update(payload).then(u=>{
                this.getAll({module:'api',resource:'smartboxes'})
              })            
            },
            async remove(smartbox){
                await this.del({module:'api',resource:'smartboxes',id:smartbox.id})
            }

        },
        async beforeMount(){
          await this.getAll({module:'api',resource:'smartboxes'})
          console.log(this.smartboxes);
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