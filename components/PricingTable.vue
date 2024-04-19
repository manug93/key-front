<template>
        
       <div>
        <ValidationObserver slim v-slot="{ handleSubmit }">
        <form action="">
        <div>
           <div class="col-12">
                <ValidationProvider rules="required" slim name="smartbox" v-slot="{classes,errors}">  
                  <div class="row">
                    <div class="field col-8">
                        <div class="mb-4">
                            <label for="smartbox" class="form-label">{{$t('smartbox')}}</label>
                            <select class="form-select"  id="smartbox" data-placeholder="Choose one smartbox"  v-model="form.smartbox"  :class="classes" placeholder="Smartbox" aria-label="user smartbox">
                                <option v-for="value in smartboxes" :value="value.keycafeId" :key="value.id">{{value.data.name}} -  {{value?.data?.location?.name}}</option>
                            </select>                                                                     
                            <small id="smartbox-help" class="p-invalid red-color">{{ errors[0] }}</small>
                        </div>  
                        <div class="col-4 mb-3" >{{ box_bins }}  {{$t('available_bins')}}</div>                                                  
                    </div>
                  </div>
                </ValidationProvider>
						</div>
            
        </div>
        <div class="row">
           <div class="col-12 col-xl-4" v-for="product in list" :key="product?.id">
             <div class="card border-top border-4 " :class="color('border',product?.data)">
               <div class="card-body p-4">
                 <div :class="color('bg',product?.data)+' '+color('text',product?.data)" class="px-2 py-1 fw-medium  bg-opacity-10  text-uppercase w-50 text-center rounded">{{product?.data[0]?.product?.name}}</div>
                 <div class="my-4">
                    <h3 class="mb-2">{{ product?.data[0]?.product?.name }}</h3>
                    <p class="mb-0">{{ product?.data[0]?.product?.metadata?.description }}</p>
                 </div>
                 <div class="pricing-content d-flex flex-column gap-3">
                  
                    <div class="d-flex align-items-center justify-content-between">
                      <p class="mb-0 fs-6">{{$t('bins')}}</p>
                      <p class="mb-0 fw-medium fs-6">{{product?.data[0]?.product?.metadata?.bins}}</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <p class="mb-0 fs-6">{{product?.description}}</p>
                    </div>
                 </div>
                 
                   
                 <div class="price-tag d-flex align-items-center justify-content-center gap-2 my-5">
                   <h5 class="mb-0 align-self-end " :class="color('text',product?.data)">€</h5>
                   <h1 class="mb-0 price-amount " :class="color('text',product?.data)">{{product?.data[0]?.unit_amount/100}}</h1>
                   <h5 class="mb-0 align-self-end " :class="color('text',product?.data)">{{ product?.duration }} {{product?.data[0]?.recurring?.interval}}{{ product?.data[0]?.recurring?.interval_count>1?'s':'' }}</h5>
                 </div>
                 <div v-if="box_bins>parseInt(product?.data[0]?.product.metadata.bins)" class="d-grid">
                   <button :class="color('btn',product?.data)" class="btn btn-lg" @click.prevent="handleSubmit(purchase(product?.data))">{{$t('purchase')}}</button>
                 </div>
                 <div v-else class="d-grid">
                   <button :class="color('btn',product?.data)" disabled class="btn btn-lg">{{$t('unsufficient_bins')}}</button>
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
          ...mapState(['isLoading','user','products','bins','smartboxes','empty_bins','plans']),
            list(){
              
              console.log(this.plans);
              //this.plans.forEach(p=>p.data=p.data[0])
              let p = this.plans??[]
              p=Object.values(p)
              console.log(p);
              p.sort((a, b) => {
                const binsA = parseInt(a.data[0].product.metadata.bins || '0', 10);
                const binsB = parseInt(b.data[0].product.metadata.bins || '0', 10);
                return binsA - binsB;
              });
              return p;
            },
            is_admin(){
              return this.user?.roles?.includes('ROLE_ADMIN');
            },
            is_colab(){
              return this.user?.roles?.includes('ROLE_COLAB');
            },
            box_bins(){
                let usedBins = this?.bins.filter(e=>e?.box===parseInt(this.form?.smartbox));
                let box= this?.smartboxes.filter(e=>parseInt(e?.keycafeId)===parseInt(this.form?.smartbox))[0];
                console.log(box);
                console.log(this?.smartboxes);
                return box?.binNumber-usedBins?.length??0

            }

        },
        methods:{
          ...mapActions(['create','getAll','del','update','fetchPlans']),          
          color(style,p){
              switch(p[0].product.name){
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
              let data={...product[0],...this.form};
              let response = await this.create({resource:'purchases',module:'stripe',data:data});
              window.open(response.invoice.hosted_invoice_url, '_blank');
              this.$router.push('/user/subscriptions');

            }

        },
        async beforeMount(){
          await this.getAll({resource:'products',module:'stripe'})
          await this.fetchPlans()
          await this.getAll({resource:'smartboxes',module:'api'});
          await this.getAll({resource:'empty_bins',module:'keycafe'});
          await this.getAll({resource:'bins',module:'api'});
        },
      mounted() {
      }

    }
</script>
