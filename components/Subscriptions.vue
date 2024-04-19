<template>
    <div >
         <!--start main wrapper-->
  <main class="main-wrapper " >
    <div class="main-content">
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">{{$t('subscription_configuration')}}</div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{$t('subscriptions')}}</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->

      <div class="product-count d-flex align-items-center gap-3 gap-lg-4 mb-4 fw-medium flex-wrap font-text1">
        <a href="javascript:;"><span class="me-1">{{$t('all')}}</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">{{$t('active')}}</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">{{$t('incomplete')}}</span><span class="text-secondary">()</span></a>
        <a href="javascript:;"><span class="me-1">{{$t('suspended')}}</span><span class="text-secondary">()</span></a>
      </div>

      <div class="row g-3">
        <div class="col-auto">
          <div class="position-relative">
            <input class="form-control px-5" type="search" v-model="query" :placeholder="$t('search_subscription')">
            <span
              class="material-icons-outlined position-absolute ms-3 translate-middle-y start-0 top-50 fs-5">search</span>
          </div>
        </div>
        
        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 justify-content-lg-end">
            <a class="btn btn-primary px-4" href="/pricing"><i class="bi bi-plus-lg me-2"></i>{{$t('subscribe')}}</a>
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
                    <th>{{$t('subscription_id')}} </th>
                    <th>{{$t('plan')}}</th>
                    <th>{{$t('customer')}}</th>
                    <th>{{$t('price')}}</th>
                    <th>{{$t('duration')}}</th>
                    <th>{{$t('count')}}</th>
                    <th>{{$t('start_date')}}</th>
                    <th>{{$t('end_date')}}</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="subscription,id in list" :key="id"  :class="subscription.status==='active'?'green':'gray'">
                    <td>
                      <input class="form-check-input" type="checkbox">
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <div class="product-box">
                         
                        </div>
                        <div class="product-info">
                          <a href="javascript:;" class="product-title">{{subscription?.items?.data[0]?.id }}</a>
                          
                        </div>
                      </div>
                    </td>
                    <td>{{ subscription?.plan?.product?.name }}</td>
                    <td>{{ subscription?.customer?.email }} {{ subscription?.customer?.id }}</td>
                    
                    <td>
                        <p class="mb-0 product-category">{{ subscription?.plan?.amount/100 }}</p>
                    </td>
                    <td>
                      {{ subscription?.plan?.interval }}
                    </td>
                    <td>
                      {{ subscription?.plan?.interval_count }}
                    </td>
                    <td>
                      <small>{{ from_date(subscription?.current_period_start) }}</small>
                    </td>
                    <td>
                      <small>{{ from_date(subscription?.current_period_end) }}</small>
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-filter dropdown-toggle dropdown-toggle-nocaret"
                          type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item " v-if="subscription.status==='incomplete'" @click="pay(subscription)" href="#"  >{{$t('pay')}}</a></li>
                          <li><a class="dropdown-item " @click="details(subscription)" href="#" data-bs-toggle="modal" data-bs-target="#subscriptionDetailsModal" >{{$t('details')}}</a></li>
                          <li><a class="dropdown-item " @click="remove(subscription)" href="#" >{{$t('cancel')}}</a></li>
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
                        <h5 class="modal-title">{{$t('add_subscription')}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit }">
                        <div class="modal-body">
                            <ValidationProvider rules="required" slim name="title"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="title" class="form-label">{{$t('title')}}</label>
                                  <input class="form-control mb-3" id="title" :class="classes" type="text" v-model="subscription.title" placeholder="Title" aria-label="subscription title">
                                  <small id="title-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="description"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="description" class="form-label">{{$t('description')}}</label> 
                                  <input class="form-control mb-3" id="description" :class="classes" type="text" v-model="subscription.description" placeholder="Description" aria-label="subscription description">
                                  <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="price"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="price" class="form-label">{{$t('price')}} $</label>
                                <input class="form-control mb-3" id="price" :class="classes" type="number" v-model="subscription.price" placeholder="Price" aria-label="subscription price in euro">
                                <small id="price-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="duration"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">{{$t('duration')}}</label>
                                  <input class="form-control mb-3" id="duration" :class="classes" type="number" v-model="subscription.duration" placeholder="Duration" aria-label="subscription duration">
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{$t('cancel')}}</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(submit)">Create subscription</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="exampleLargeModalEdit" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Edit Subscription</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      
                      <ValidationObserver slim v-slot="{ handleSubmit }">
                        <div class="modal-body">
                            <ValidationProvider rules="required" slim name="title"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="title" class="form-label">Title</label>
                                  <input class="form-control mb-3" id="title" :class="classes" type="text" v-model="subscription.title" placeholder="Title" aria-label="subscription title">
                                  <small id="title-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="description"  v-slot="{classes,errors}"> 
                                <div class="field">
                                  <label for="description" class="form-label">Description</label> 
                                  <input class="form-control mb-3" id="description" :class="classes" type="text" v-model="subscription.description" placeholder="Description" aria-label="subscription description">
                                  <small id="description-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="price"  v-slot="{classes,errors}">  
                               <div class="field">
                                <label for="price" class="form-label">Price in $</label>
                                <input class="form-control mb-3" id="price" :class="classes" type="number" v-model="subscription.price" placeholder="Price" aria-label="subscription price in euro">
                                <small id="price-help" class="p-invalid red-color">{{ errors[0] }}</small>
                               </div>
                             </ValidationProvider>
                             <ValidationProvider rules="required" slim name="duration"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="duration" class="form-label">Duration</label>
                                  <input class="form-control mb-3" id="duration" :class="classes" type="number" v-model="subscription.duration" placeholder="Duration" aria-label="subscription duration">
                                  <small id="duration-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                </div>
                             </ValidationProvider>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="handleSubmit(editSubscription)">Edit subscription</button>
                        </div>
                     </ValidationObserver>
                    </div>
                  </div>
                </div>

                <div class="modal fade" id="subscriptionDetailsModal" tabindex="-1" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">{{ $t("subscription_details") }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p>ID: {{ subscription?.id }}</p>
                        <p>Object: {{ subscription?.object }}</p>
                        <p>{{ $t("created") }}: {{ subscription?.created ? new Date(subscription.created * 1000).toLocaleString() : 'N/A' }}</p>
                        <p>{{ $t("currency") }}: {{ subscription?.currency }}</p>
                        <p>{{ $t("status") }}: {{ subscription?.status }}</p>
                        <p>{{ $t("customer_id") }}: {{ subscription?.customer?.id }}</p>
                        <p>{{ $t("customer_name") }}: {{ subscription?.customer?.name }}</p>
                        <p>{{ $t("customer_email") }}: {{ subscription?.customer?.email }}</p>
                        <p> {{ $t("customer_description") }}: {{ subscription?.customer?.description }}</p>
                        <p>{{ $t("current_period_start") }}: {{ subscription?.current_period_start ? new Date(subscription.current_period_start * 1000).toLocaleString() : 'N/A' }}</p>
                        <p>{{ $t("current_period_end") }}: {{ subscription?.current_period_end ? new Date(subscription.current_period_end * 1000).toLocaleString() : 'N/A' }}</p>
                        <p>{{ $t("amount") }}: {{ subscription?.items?.data[0]?.price?.unit_amount ? (subscription.items.data[0].price.unit_amount / 100) + ' ' + subscription.currency : 'N/A' }}</p>
                        <p>{{ $t("description") }}: {{ subscription?.description || 'N/A' }}</p>
                        <p>{{ $t("billing_cycle_anchor") }}: {{ subscription?.billing_cycle_anchor || 'N/A' }}</p>
                        <p>{{ $t("default_payment_method") }}: {{ subscription?.default_payment_method || 'N/A' }}</p>
                        <p>{{ $t("days_until_due") }}: {{ subscription?.days_until_due || 'N/A' }}</p>
                        <p>{{ $t("ended_at") }}: {{ subscription?.ended_at ? new Date(subscription.ended_at * 1000).toLocaleString() : 'N/A' }}</p>
                        <p>{{ $t("livemode") }}: {{ subscription?.livemode ? 'Yes' : 'No' }}</p>
                        <p>{{ $t("next_pending_invoice_item") }}: {{ subscription?.next_pending_invoice_item_invoice || 'N/A' }}</p>
                        <p>{{ $t("quantity") }}: {{ subscription?.quantity || 'N/A' }}</p>
                        <p>{{ $t("start_date") }} : {{ subscription?.start_date ? new Date(subscription.start_date * 1000).toLocaleString() : 'N/A' }}</p>
                        <p>{{ $t("test_clock") }}: {{ subscription?.test_clock || 'N/A' }}</p>
                        <!-- Add more fields as needed -->
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("close") }}</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- based o the previous modal code create a modal that shows the subscription details-->  
                
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
        name:"SubscriptionManager.vue",
        store:store,
        components:{ValidationProvider,ValidationObserver,ErrorModal},
        data(){
            return {
                subscription:{},
                file:null,
                display:false,
                query:""
            }
        },
        computed:{
            ...mapState(['subscriptions','isLoading','user']),
            list(){   
              if(this.is_admin ||this.is_colab){
                return  this.query?this.searchResults.map(r=>r.item):this.subscriptions?.products?.data
              } 
              let res = this.query?this.searchResults.map(r=>r.item):this.subscriptions?.products?.data           
              let data = res?.filter((e=>e?.customer?.email===this?.user?.email)) || []
              return data
            }, 
            fuse(){
              return  new this.$fuse(this.subscriptions?.products?.data, { keys: ['id','customer.email','plan.product.name'] })
            },
            searchResults(){
              return this.fuse.search(this.query)
            },
            is_admin(){
              return this.user?.roles?.includes('ROLE_ADMIN')
            },
            is_colab(){
              return this.user?.roles?.includes('ROLE_COLAB')
            },
            


            
        },
        methods:{
            ...mapActions(['create','getAll','del','update','getById']),
            async submit(){
            },
            asset(uri){
              return `${baseUrl}/${uri}`;
            },
            details(subscription){
              this.subscription=subscription;              
            },
            edit(subscription){
              this.subscription=subscription;              
            },
            async editSubscription(){              
              
              this.update({resource:'subscriptions',module:'stripe',data:this.subscription}).then(u=>{
                location.reload()
              })            
            },
            remove(subscription){
              this.del({resource:'subscriptions',module:'stripe',id:subscription.id})
            },
            to_date(date){
              return this.$moment.unix(date).toNow();
            },
            from_date(date){
              return this.$moment.unix(date).fromNow();
            },
            async pay(sub){
              try{
                let res=await this.getById({id:sub.latest_invoice,module:"stripe",resource:"invoice"});
                window.open(res?.invoice?.hosted_invoice_url, '_blank');
              }catch(e){
                console.log(e)
              }
              
            }

        },
         beforeMount(){
          this.getAll({resource:'subscriptions',module:'stripe'})
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
    .gray{
      color:gray;
      font-weight: bold;
    }
    .green *{
      color:#90FF90 !important;
      font-weight: bold;
    }
    
</style>