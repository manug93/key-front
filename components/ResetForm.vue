<template>
    <div>
        <div class="container-fluid my-5">
        <div class="row">
           <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
            <div class="card rounded-4">
              <div class="card-body p-5">
                  <img src="/assets/images/logo1.png" class="mb-4" width="145" alt="">
                  <p class="mb-0">{{$t('enter_your_new_password')}}</p>

                  <div class="form-body my-4">
						<ValidationObserver slim v-slot="{ handleSubmit }">
										<form class="row g-3">
											<div class="col-12">
												<ValidationProvider rules="required" slim name="password"  v-slot="{classes,errors}">   
													<label for="inputChoosePassword" class="form-label">{{$t('password')}}</label>
													<div class="input-group" id="show_hide_password">
														<input type="password" v-model="form.password" :class="classes" class="form-control border-end-0" id="inputChoosePassword" value="12345678" placeholder="Enter Password"> 
															<a href="javascript:;" class="input-group-text bg-transparent"><i class="bi bi-eye-slash-fill"></i></a>
													</div>
													<small id="password-help" class="p-invalid red-color">{{ errors[0] }} </small>
												</ValidationProvider>
											</div>
											<div class="col-12">
												<div class="d-grid">
													<button type="submit" class="btn btn-primary" @click.prevent="handleSubmit(submit)">{{$t('change_password')}}</button>
												</div>
											</div>
										</form>
									</ValidationObserver>
									
									</div>
									<div class="ml-3">
										<select v-model="currentLocale">
											<option value="fr">{{ $t('french') }}</option>
											<option value="en">{{ $t('english') }}</option>
										</select>
									</div>

             

              </div>
            </div>
           </div>
        </div><!--end row-->
     </div>
	 
	 <Loading></Loading>
      <ErrorModal></ErrorModal>
    </div>
</template>
<script>
	import $ from '~/static/assets/js/jquery.min.js'
	import store from "~/store/store";    
	import {mapState,mapActions} from "vuex";
    import Loading from './Loading.vue';
    import ErrorModal from './ErrorModal.vue';
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"ResetForm.vue",
		store,
        data(){
            return{
                form:{},
				currentLocale:""
            }
        },
		methods:{
			...mapActions(['resetPassword','setLang']),
			async submit(){

				let response = await this.resetPassword(this.form); 
                if(response?.status===200)     {
                    this.$router.push("/login");
                }          
			}
		},
		watch: {
		  currentLocale(newLocale) {
			this.$i18n.setLocale(newLocale);
		  }
		},
		computed:{},
		components:{ValidationProvider,ValidationObserver,Loading,ErrorModal},
		beforeMount(){
			this.currentLocale=this.$i18n.locale;
			this.form.resetCode=this.$route.query.code;
		},
		mounted(){
			
			$("#show_hide_password a").on('click', function (event) {
          event.preventDefault();
          if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("bi-eye-slash-fill");
            $('#show_hide_password i').removeClass("bi-eye-fill");
          } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("bi-eye-slash-fill");
            $('#show_hide_password i').addClass("bi-eye-fill");
          }
        });
		}
    }
</script>
<style></style>