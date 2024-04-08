<template>
    <div>
      <Navbar/>
      <div class="row">
        <div class="col-2"><Sidebar/></div>
        <div class="col-10">
          <main class="main-wrapper ms-3" >
            <div class="main-content">
              <!--div class="col-12">
                            <ValidationProvider rules="required" slim name="smartbox" v-slot="{classes,errors}">  
                                   <div class="field">
                                                        <div class="mb-4">
                                                            <label for="smartbox" class="form-label">Smartbox</label>
                                                            <select class="form-select" id="smartbox" data-placeholder="Choose one smartbox"  v-model="form.smartbox"  :class="classes" placeholder="Smartbox" aria-label="user smartbox">
                                                                <option v-for="value,id in smartboxes" :value="value.id" :key="value.id">{{value.name}} -  {{value?.location?.name}}</option>
                                                            </select>                                                                     
                                                            <small id="smartbox-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                                        </div>  
                                                        <div>{{ box_bins.length }} Empty bins</div>                                                  
                                                    </div>
                                                </ValidationProvider>
											</div -->
                  <!--stripe-pricing-table pricing-table-id="prctbl_1OzbugE3BwvFeWIRMHQu23av"
                publishable-key="pk_test_51L5tGLE3BwvFeWIRBsH4zJL5L3ouuy2Nc3kAvgARg2hxjfiElOct56cPrep8UTejGsLR3H5EZQGq7gXgA61km6hs00ivz07PR9">
                </stripe-pricing-table-->  
                <PricingTable></PricingTable>
            </div>
        </main>
        </div>
      </div>
      <CartManager ></CartManager>     
                   
      <Loading></Loading>
    </div>
</template>
<script>
const scripts = [
    '/assets/js/jquery.min.js',
    '/assets/plugins/metismenu/metisMenu.min.js',
    '/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js',
    '/assets/js/main.js',
    '/assets/plugins/simplebar/js/simplebar.min.js',
    '/assets/js/bootstrap.bundle.min.js',
    'https://js.stripe.com/v3/pricing-table.js'
  ]
  const styles = [  
    '/sass/semi-dark.css',
    '/sass/main.css',
    '/sass/dark-theme.css',
    '/assets/css/bootstrap.min.css',
    '/assets/css/bootstrap-extended.css',
    '/sass/responsive.css',
    '/assets/plugins/metismenu/mm-vertical.css',
    '/assets/plugins/metismenu/metisMenu.min.css',
    '/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css',
    '/assets/plugins/simplebar/css/simplebar.css',
  ];
export default{
    name:"PrincingPage",
    mounted(){
       Promise.all([
        ...scripts.map(url => this.$loadFiles.loadScript(url)),
        ...styles.map(url => this.$loadFiles.loadCSS(url))
      ])
    }
}
</script>