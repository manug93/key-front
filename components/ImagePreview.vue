Here's a Vue component for a centered and rounded image preview:

Extrait de code
<template>
  <div class="image-preview">
    <img :src="imageUrl" :alt="altText" />
  </div>
</template>

<script>
export default {
  name:"ImagePreview.vue",
  props: {
    imageUrl: String,
    altText: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%; /* Adjust as desired */
}

.image-preview img {
  width: 100%; /* Adjust as desired */
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio */
}
</style>