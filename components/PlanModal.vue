<template>
    <div>
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
                             
                             <ValidationProvider rules="required" slim name="picture"  v-slot="{classes,errors}">  
                                <div class="field">
                                  <label for="picture" class="form-label">Picture</label>
                                  <input class="form-control mb-3" id="pictureFile" :class="classes" type="file" v-on:change="selectPicture" placeholder="Picture" aria-label="plan picture">
                                  <input class="form-control mb-3" id="picture" v-model="file"  type="hidden" >
                                  <small id="picture-help" class="p-invalid red-color">{{ errors[0] }}</small>
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
            </div>
</template>
<script>
    export default {
        name:"PlanModal"
    }
</script>