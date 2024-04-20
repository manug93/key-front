<template>
    <div>
         <!--start main wrapper-->
  <main class="main-wrapper ">
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">{{$t('plan_configuration')}}</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{$t('plans')}}</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->

      <div class="row g-3">
        <div class="col-auto">
          <div class="position-relative">
            <input class="form-control px-5" type="search" :placeholder="$t('search_plan')">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
           
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
                    <th>{{$t('plan_name')}}</th>
                    <th>{{$t('price')}}</th>
                    <th>{{$t('description')}}</th>
                    <th>{{$t('bins')}}</th>
                    <th>{{$t('duration')}}</th>
                    <th>{{$t('creation_date')}}</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="plan in plans" :key="plan.id">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    
                    <td>{{ plan?.title }}</td>
                    <td>{{ plan?.price }}</td>
                    <td>{{ plan?.description }}</td>
                    
                    <td>
                        <p class="mb-0 product-category">{{ plan?.bins }}</p>
                    </td>
                    
                    <td>{{ plan?.duration }}</td>
                    <td>
                     {{plan?.createdAt}}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item " @click="edit(plan)" data-bs-toggle="modal" data-bs-target="#exampleLargeModalEdit" href="#">{{$t('edit')}}</a></li>
                          <li><a class="dropdown-item " @click="remove(plan)" href="#" >{{$t('delete')}}</a></li>
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
    </div>
  </main>
                      

                <div class="modal fade" id="exampleLargeModalEdit" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{$t('edit_plan')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit }">
                        <div class="modal-body">                        
                             
                             <ValidationProvider rules="required" slim name="number"  v-slot="{errors}">  
                                <div class="field">
                                  <label for="number" class="form-label">{{$t('bin_number')}}</label>
                                  <input class="form-control mb-3" id="number" v-model="plan.bins"  type="number" >
                                  <small id="number-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	

                              <ValidationProvider rules="required" slim name="duration"  v-slot="{errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">{{$t('duration')}}</label>
                                  <input class="form-control mb-3" id="duration" v-model="plan.duration"  type="number" >
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editPlan)">{{$t('edit_plan')}}</button>
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
        name:"ProductManager.vue",
        store,
        components:{ValidationProvider,ValidationObserver,ErrorModal},
        data(){
            return {
                plan:{},
                file:null,
            }
        },
        computed:{
            ...mapState(['plans']),
            drafts(){
              let drafts=this.plans.filter(e=>e.status===undefined);
              return drafts.length;
            },
            published(){
              let published=this.plans.filter(e=>e.status==='PUBLISHED');
              return published.length;
            }

            
        },
        methods:{
            ...mapActions(['createPlan','del','fetchPlans','createPicture','update']),
            async submit(){
                /*this.plan.duration=parseInt(this.plan.duration)
                this.plan.price=parseInt(this.plan.price)
                let form =new FormData();
                form.append('file',this.file);              
                let response = await this.createPicture(form);
                this.plan.pictures=["/api/pictures/"+response.data.id]
                this.createPlan(this.plan)*/
            },
            selectPicture(event){
              this.file=event.target.files[0];
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            publish(plan){
              this.plan=plan;              
            },
            edit(plan){
              this.plan=plan;              
            },
            async editPlan(){              
              this.plan.price=parseInt(this.plan.price)   
              let payload={
                resource:'plans',
                module:'api',
                id:this.plan.id,
                data:{
                  id:this.plan.id,
                  bins:parseInt(this.plan.bins),
                  duration:parseInt(this.plan.duration),
                  bins:parseInt(this.plan.bins),
                  title:this.plan.title,
                  stripeId:this.plan.stripeId,
                  price:this.plan.price
                }
              };
              this.update(payload).then(u=>{
                this.fetchPlans()
              })            
            },
            async remove(plan){
                await this.del({module:'api',resource:'plans',id:plan.id})
            }

        },
        beforeMount(){
          this.fetchPlans()
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