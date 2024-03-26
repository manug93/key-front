<template>
    <div>
         <!--start main wrapper-->
  <main class="main-wrapper ">
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Plan configuration</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Plans</li>
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
        <a href="javascript:;"><span class="me-1">All</span><span class="text-secondary">(88754)</span></a>
        <a href="javascript:;"><span class="me-1">Published</span><span class="text-secondary">(56242)</span></a>
        <a href="javascript:;"><span class="me-1">Drafts</span><span class="text-secondary">(17)</span></a>
        <a href="javascript:;"><span class="me-1">On Discount</span><span class="text-secondary">(88754)</span></a>
      </div>

      <div class="row g-3">
        <div class="col-auto">
          <div class="position-relative">
            <input class="form-control px-5" type="search" placeholder="Search Products">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <button class="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#exampleLargeModal"><i class="bi bi-plus-lg me-2"></i>Add Plan</button>
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
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <div class="product-box">
                          <img src="/assets/images/orders/01.png" width="70" class="rounded-3" alt="">
                        </div>
                        <div class="product-info">
                          <a href="javascript:;" class="product-title">Women Pink Floral Printed</a>
                          
                        </div>
                      </div>
                    </td>
                    <td>$49</td>
                    
                    <td>
                        <p class="mb-0 product-category">Women Pink Floral Printed Women Pink Floral Printed Women Pink Floral Printed</p>
                    </td>
                    <td>
                      Nov 12, 10:45 PM
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">Action</a></li>
                          <li><a class="dropdown-item" href="#">Another action</a></li>
                          <li><a class="dropdown-item" href="#">Something else here</a></li>
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
                        <h5 class="modal-title">Add Plan</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit, reset }">
                        <div class="modal-body">
                            <ValidationProvider rules="required" slim name="title"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="title" class="form-label">Title</label>
                                  <input class="form-control mb-3" id="title" :class="classes" type="text" v-model="plan.title" placeholder="Title" aria-label="plan title">
                                  <small id="title-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="description"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="description" class="form-label">Description</label> 
                                  <input class="form-control mb-3" id="description" :class="classes" type="text" v-model="plan.description" placeholder="Description" aria-label="plan description">
                                  <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="price"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="price" class="form-label">Price in $</label>
                                <input class="form-control mb-3" id="price" :class="classes" type="number" v-model="plan.price" placeholder="Price" aria-label="plan price in euro">
                                <small id="price-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="duration"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">Duration</label>
                                  <input class="form-control mb-3" id="duration" :class="classes" type="number" v-model="plan.duration" placeholder="Duration" aria-label="plan duration">
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">Create plan</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>
  <!--end main wrapper-->
    </div>

</template>
<script>

    import {Plan} from "~/store/models";
	import store from "~/store/store";    
	import {mapState,mapActions} from "vuex";
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"ProductManager.vue",
        store,
        components:{ValidationProvider,ValidationObserver},
        data(){
            return {
                plan:new Plan()
            }
        },
        computed:{
            ...mapState(['plans'])
        },
        methods:{
            ...mapActions(['createPlan','fetchPlans']),
            submit(){
                this.plan.duration=parseInt(this.plan.duration)
                this.plan.price=parseInt(this.plan.price)
                this.createPlan(this.plan)
            }
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