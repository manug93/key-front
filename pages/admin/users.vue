<template>
    <div>
      <Navbar/>
      <div class="grid">
        <div><Sidebar/></div>
        <div><UserManager></UserManager></div>
      </div>
      <CartManager></CartManager>
    </div>
  </template>
  <script>
  const scripts = [
      '/assets/js/jquery.min.js',
      '/assets/js/bootstrap.bundle.min.js',
      '/assets/plugins/metismenu/metisMenu.min.js',
      '/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js',
      '/assets/plugins/simplebar/js/simplebar.min.js',
      '/assets/js/main.js',
      'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
      '/assets/plugins/select2/js/select2-custom.js',
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
      '/sass/responsive.css',
      'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css',
      'https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css'
    ];
  export default {
    name: 'UsersPage',
    async mounted(){
      await Promise.all([
      ...scripts.map(url => this.$loadFiles.loadScript(url)),
      ...styles.map(url => this.$loadFiles.loadCSS(url))
    ]);
      
    }
  }
  </script>
  