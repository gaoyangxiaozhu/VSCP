<template lang="html">
    <div class="container video-compute">
            <div class="row">
                <div class="col-xs-3">
                    <Slidebar></Slidebar>
                </div>
                <div class="col-xs-9">
                </div>
            </div>
    </div>
</template>

<script>

import Loginmodal from '../Login/modal.vue'
import Scrolltop from '../Scrolltop/index.vue'
import Slidebar from '../Slidebar/index.vue'

export default {
    components: { Loginmodal, Scrolltop, Slidebar },
    data () {
        return {}
    },
    computed: {},
    ready () {},
    attached () {},
    methods: {}

}
</script>

<style lang="sass">
</style>
