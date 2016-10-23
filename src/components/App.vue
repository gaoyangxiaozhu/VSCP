<template>
  <div class="top-box">
    <Navbar></Navbar>
    <router-view></router-view>
    <Toaster></Toaster>
    <Footerbar></Footerbar>
  </div>
</template>

<script>
import store from '../vuex/store'
import Navbar from './Navbar'
import Toaster from './Toaster'
import Footerbar from './footer'

export default {
    store,
    components: { Navbar, Toaster, Footerbar }
}
</script>
<style lang="sass">

</style>
