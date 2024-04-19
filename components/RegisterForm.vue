<template>
    <div>
        <div class="container-fluid my-5">
        <div class="row">
           <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-5 mx-auto">
            <div class="card rounded-4">
              <div class="card-body p-5">
                  <img src="/assets/images/logo1.png" class="mb-4" width="145" alt="">
                  <h4 class="fw-bold">{{$t('get_started_now')}}</h4>
                  <p class="mb-0">{{ $t('enter_your_credentials') }}</p>

                  <div class="form-body my-4">
                    
                    <ValidationObserver slim v-slot="{ handleSubmit }">
										<form class="row g-3">
											<div class="col-12">
                                                <ValidationProvider rules="required" slim name="firstname"  v-slot="{classes,errors}"> 
												    <label for="inputFirstname" class="form-label">{{ $t('firstname') }}</label>
												    <input type="text" v-model="form.firstname" class="form-control" id="inputFirstname"  :class="classes" placeholder="Jhon">
                                                    <small id="firstname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                                </ValidationProvider>
											</div>
                                            
											<div class="col-12">
                                                <ValidationProvider rules="" slim name="lastname"  v-slot="{classes,errors}"> 
												    <label for="inputLastname" class="form-label">{{ $t('lastname') }}</label>
												    <input type="text" class="form-control" v-model="form.lastname" id="inputLastname"  :class="classes" placeholder="Doe">  
                                                    <small id="lastname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                                </ValidationProvider>
											</div>

											<div class="col-12">
                                                <ValidationProvider rules="required|email" tag="div" name="email" v-slot="{classes,errors}"> 
												    <label for="inputEmailAddress" class="form-label">{{ $t('email_address') }}</label>
												    <input type="email" class="form-control" v-model="form.email" id="inputEmailAddress"  :class="classes" placeholder="example@user.com">
                                                    <small id="email-help" class="p-invalid red-color">{{ errors[0] }} </small>
                                                </ValidationProvider>
											</div>
											<div class="col-12">
                                                <ValidationProvider rules="required" slim name="password"  v-slot="{classes,errors}">   
												<label for="inputChoosePassword"  class="form-label">{{ $t('password') }}</label>
												<div class="input-group" id="show_hide_password">
													<input type="password" v-model="form.password" class="form-control border-end-0"  :class="classes" id="inputChoosePassword" value="12345678" placeholder="Enter Password">
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i class="bi bi-eye-slash-fill"></i></a>
												</div>                                                
                                                <small id="password-help" class="p-invalid red-color">{{ errors[0] }} </small>
                                                </ValidationProvider>
											</div>
											
                                           
											<div class="col-12">
												<div class="form-check form-switch">
													<input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked">
													<label class="form-check-label" for="flexSwitchCheckChecked">{{ $t('read_and_agree_terms') }}</label>
												</div>
											</div>
											<div class="col-12">
												<div class="d-grid">
													<button type="submit" class="btn btn-primary" @click.prevent="handleSubmit(submit)">{{ $t('register') }}</button>
												</div>
											</div>
											<div class="col-12">
												<div class="text-start">
													<p class="mb-0">{{ $t('already_have_account') }} <a href="/login">{{ $t('sign_in') }}</a></p>
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
    <!--authentication-->
    </div>
</template>
<script>
    import $ from '~/static/assets/js/jquery.min.js'
	import store from "~/store/store";    
	import {mapState,mapActions} from "vuex";
    import Loading from './Loading.vue';
    import ErrorModal from './ErrorModal.vue';
    import ImagePreview from './ImagePreview.vue';
    import {avatars} from "~/store/tools";
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"RegisterForm.vue",
        store,
        data(){
            return{
                form:{},
                currentLocale:""
            }
        },
		methods:{
			...mapActions(['register','getAll','fetchToken']),
			async submit(){
				let response = await this.register(this.form); 
                if(response?.status===201 && !this.error)     {
                    await this.fetchToken({username:this.form.email,password:this.form.password});
                    this.$router.push("/pricing");
                }          
                console.log(response);
			},
            setAvatar(avatar){
                console.log(avatar)
            }
		},
		watch: {
		  currentLocale(newLocale) {
			this.$i18n.setLocale(newLocale);
		  }
		},
		computed:{
            ...mapState(['isLoading','error','user']),
            avatars(){
                return avatars;
            }
        },
		components:{ValidationProvider,ValidationObserver,Loading,ErrorModal,ImagePreview},
        async beforeMount(){
            this.currentLocale=this.$i18n.locale
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