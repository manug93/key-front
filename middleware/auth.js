export default function ({ store,route, redirect }) {
   
   if (!checkLocalStorageItem('token') && !['pricing','login','register'].includes(route.name)){
    redirect("/login")
   } 
   if (store.state.auth===false ){
    redirect("/login")
   }
  }
  function checkLocalStorageItem(key) {
    const item = localStorage.getItem(key);
    return item !== null && item !== undefined;
  }
  
  