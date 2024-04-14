<template>
        
       <div>
        <ValidationObserver slim v-slot="{ handleSubmit, reset }">
        <form action="">
        <div>
           <div class="col-12">
                <ValidationProvider rules="required" slim name="smartbox" v-slot="{classes,errors}">  
                  <div class="row">
                    <div class="field col-8">
                        <div class="mb-4">
                            <label for="smartbox" class="form-label">{{$t('smartbox')}}</label>
                            <select class="form-select" id="smartbox" data-placeholder="Choose one smartbox"  v-model="form.smartbox"  :class="classes" placeholder="Smartbox" aria-label="user smartbox">
                                <option v-for="value,id in smartboxes" :value="value.id" :key="value.id">{{value.name}} -  {{value?.location?.name}}</option>
                            </select>                                                                     
                            <small id="smartbox-help" class="p-invalid red-color">{{ errors[0] }}</small>
                        </div>  
                        <div class="col-4 mb-3" >{{ box_bins.length }}  {{$t('available_bins')}}</div>                                                  
                    </div>
                  </div>
                </ValidationProvider>
						</div>
            
        </div>
        <div class="row">
           <div class="col-12 col-xl-4" v-for="product in list">
             <div class="card border-top border-4 " :class="color('border',product)">
               <div class="card-body p-4">
                 <div :class="color('bg',product)+' '+color('text',product)" class="px-2 py-1 fw-medium  bg-opacity-10  text-uppercase w-50 text-center rounded">{{product.product.name}}</div>
                 <div class="my-4">
                    <h3 class="mb-2">{{product?.product?.name}}</h3>
                    <p class="mb-0">{{ product?.product?.metadata?.description }}</p>
                 </div>
                 <div class="pricing-content d-flex flex-column gap-3">
                  
                    <div class="d-flex align-items-center justify-content-between">
                      <p class="mb-0 fs-6">{{$t('bins')}}</p>
                      <p class="mb-0 fw-medium fs-6">{{product?.product?.metadata?.bins}}</p>
                    </div>
                 </div>
                 <div class="price-tag d-flex align-items-center justify-content-center gap-2 my-5">
                   <h5 class="mb-0 align-self-end " :class="color('text',product)">€</h5>
                   <h1 class="mb-0 lh-1 price-amount " :class="color('text',product)">{{product?.unit_amount/100}}</h1>
                   <h5 class="mb-0 align-self-end " :class="color('text',product)">{{$t('for')}} {{ product?.recurring?.interval_count }} {{product?.recurring?.interval}}{{ product?.recurring?.interval_count>1?'s':'' }}</h5>
                 </div>
                 <div v-if="box_bins.length>parseInt(product.product.metadata.bins)" class="d-grid">
                   <button :class="color('btn',product)" class="btn btn-lg" @click.prevent="purchase(product)">{{$t('purchase')}}</button>
                 </div>
                 <div v-else class="d-grid">
                   <button :class="color('btn',product)" disabled class="btn btn-lg">{{$t('unsufficient_bins')}}</button>
                 </div>
               </div>
             </div>
           </div>
          
       
        </div><!--end row-->
      </form>
    </ValidationObserver>
      <Loading></Loading>
       <ErrorModal></ErrorModal>
       </div>
</template>
<script>

    import store from "~/store/store";    
	  import {mapState,mapActions} from "vuex";
    import Loading from './Loading.vue';
    import ErrorModal from './ErrorModal.vue';
	 import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"PricingTable",
        store,
        components:{ ValidationProvider,ValidationObserver,Loading,ErrorModal},
        data(){
            return {
                display:false,
                form:{},
                query:"",
                test:0
            }
        },
        computed:{          
          ...mapState(['isLoading','user','products','smartboxes','empty_bins']),
            list(){
              let products = this.products?.products
              products?.sort((a, b) => {
                const binsA = parseInt(a.product.metadata.bins || '0', 10);
                const binsB = parseInt(b.product.metadata.bins || '0', 10);
                return binsA - binsB;
              });
              return products;
            },
            is_admin(){
              return this.user?.roles?.includes('ROLE_ADMIN');
            },
            is_colab(){
              return this.user?.roles?.includes('ROLE_COLAB');
            },
            box_bins(){
                let arr=Object.values(this.empty_bins);
                return arr?.filter(e=>e?.box?.id===this.form?.smartbox);
            }

        },
        methods:{
          ...mapActions(['create','getAll','del','update']),          
          color(style,p){
              switch(p.product.name){
                case "Basic":
                  return style+"-primary"
                case "Standard":                  
                  return style+"-success"
                case "Premium":
                  return style+"-danger"
                default :
                  return style+"-primary"
              }
            },
            async purchase(product){
              let data={...product,...this.form};
              let response = await this.create({resource:'purchases',module:'stripe',data:data});
              window.open(response.invoice.hosted_invoice_url, '_blank');
              this.$router.push('/user/subscriptions');

            }

        },
        async beforeMount(){
          await this.getAll({resource:'products',module:'stripe'})
          await this.getAll({resource:'smartboxes',module:'keycafe'});
          await this.getAll({resource:'empty_bins',module:'keycafe'});
        },
      mounted() {
      }

    }
</script>
