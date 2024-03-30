<template>
    <div></div>
</template>
<script>
    export default {
        name:"logout",
        beforeMount(){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.$router.push('/login')
        }
    }
</script>