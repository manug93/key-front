<template>
    <div><ResetRequestForm /></div>
</template>
<script>
  const scripts = [
    '/assets/js/jquery.min.js',
    '/assets/js/bootstrap.bundle.min.js'
  ];

 const styles = [
    '/assets/plugins/metismenu/mm-vertical.css'
  ];
    export default{
        name:"LoginPage",
        async mounted(){
            await Promise.all([
                ...scripts.map(url => this.$loadFiles.loadScript(url)),
                ...styles.map(url => this.$loadFiles.loadCSS(url))
            ]);
        }
    }
</script>