<template>
    <div>
        <stripe-pricing-table pricing-table-id="prctbl_1OzbugE3BwvFeWIRMHQu23av"
            publishable-key="pk_test_51L5tGLE3BwvFeWIRBsH4zJL5L3ouuy2Nc3kAvgARg2hxjfiElOct56cPrep8UTejGsLR3H5EZQGq7gXgA61km6hs00ivz07PR9">
        </stripe-pricing-table>
    </div>
</template>
<script>
const scripts = [
'https://js.stripe.com/v3/pricing-table.js'
  ]
export default{
    name:"PrincingPage",
    mounted(){
       Promise.all(...scripts.map(url => this.$loadFiles.loadScript(url)))
    }
}
</script>