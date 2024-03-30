<template>
    <div>
      <Navbar/>
      <div class="grid">
        <div><Sidebar/></div>
        <div><KeyManager></KeyManager></div>
      </div>
      <CartManager></CartManager>
    </div>
  </template>
  
  <script>
  const scripts = [
      '/assets/js/jquery.min.js',
      '/assets/plugins/metismenu/metisMenu.min.js',
      '/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js',
      '/assets/js/main.js',
      '/assets/plugins/simplebar/js/simplebar.min.js',
      '/assets/js/bootstrap.bundle.min.js'
    ];
   //'primeflex/primeflex.css',
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
      '/sass/responsive.css'
    ];
  export default {
    name: 'KeycafePage',
    async mounted(){
      await Promise.all([
      ...scripts.map(url => this.$loadFiles.loadScript(url)),
      ...styles.map(url => this.$loadFiles.loadCSS(url))
    ]);
      
    }
  }
  </script>
  