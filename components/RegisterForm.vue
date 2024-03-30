<template>
    <div>
        <div class="container-fluid my-5">
        <div class="row">
           <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-5 mx-auto">
            <div class="card rounded-4">
              <div class="card-body p-5">
                  <img src="assets/images/logo1.png" class="mb-4" width="145" alt="">
                  <h4 class="fw-bold">Get Started Now</h4>
                  <p class="mb-0">Enter your credentials to create your account</p>

                  <div class="form-body my-4">
                    <ValidationObserver slim v-slot="{ handleSubmit, reset }">
										<form class="row g-3">
											<div class="col-12">
                                                <ValidationProvider rules="required" slim name="firstname"  v-slot="{classes,errors}"> 
												    <label for="inputFirstname" class="form-label">Firstname</label>
												    <input type="text" v-model="form.firstname" class="form-control" id="inputFirstname"  :class="classes" placeholder="Jhon">
                                                    <small id="firstname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                                </ValidationProvider>
											</div>
                                            
											<div class="col-12">
                                                <ValidationProvider rules="" slim name="lastname"  v-slot="{classes,errors}"> 
												    <label for="inputLastname" class="form-label">Lastname</label>
												    <input type="text" class="form-control" v-model="form.lastname" id="inputLastname"  :class="classes" placeholder="Doe">  
                                                    <small id="lastname-help" class="p-invalid red-color">{{ errors[0] }}</small>
                                                </ValidationProvider>
											</div>

											<div class="col-12">
                                                <ValidationProvider rules="required|email" tag="div" name="email" v-slot="{classes,errors}"> 
												    <label for="inputEmailAddress" class="form-label">Email Address</label>
												    <input type="email" class="form-control" v-model="form.email" id="inputEmailAddress"  :class="classes" placeholder="example@user.com">
                                                    <small id="email-help" class="p-invalid red-color">{{ errors[0] }} </small>
                                                </ValidationProvider>
											</div>
											<div class="col-12">
                                                <ValidationProvider rules="required" slim name="password"  v-slot="{classes,errors}">   
												<label for="inputChoosePassword"  class="form-label">Password</label>
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
													<label class="form-check-label" for="flexSwitchCheckChecked">I read and agree to Terms &amp; Conditions</label>
												</div>
											</div>
											<div class="col-12">
												<div class="d-grid">
													<button type="submit" class="btn btn-primary" @click.prevent="handleSubmit(submit)">Register</button>
												</div>
											</div>
											<div class="col-12">
												<div class="text-start">
													<p class="mb-0">Already have an account? <a href="/login">Sign in here</a></p>
												</div>
											</div>
										</form>
                                    </ValidationObserver>
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
	import { ValidationProvider,ValidationObserver } from 'vee-validate';
    export default {
        name:"RegisterForm.vue",
        store,
        data(){
            return{
                form:{}
            }
        },
		methods:{
			...mapActions(['register']),
			async submit(){
				let response = await this.register(this.form); 
                if(response.status===200)     {
                    //this.$router.push("/login");
                }          
                console.log(response.data);
			}
		},
		computed:{
            ...mapState(['isLoading'])
        },
		components:{ValidationProvider,ValidationObserver,Loading,ErrorModal},
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