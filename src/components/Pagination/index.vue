<template>
  <div class="pagination">
    <div v-if="options.currentPage > 1" class="text-center prev active">
      <a v-link="{ name: 'videoStorageList', params: options, query: { page: parseInt(options.currentPage) - 1 } }" class="link-title">
          <i class="fa fa-angle-left icon-mr"></i>
          <span>Prev Page</span>
      </a>
    </div>
    <div v-if="more" class="text-center next active">
      <a v-link="{ name: 'videoStorageList', params: options, query: { page: parseInt(options.currentPage) + 1 } }" class="link-title">
          <span>Next Page</span>
          <i class="fa fa-angle-right icon-ml"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
    props:['options', 'more']
}
</script>
<style lang="sass">

</style>
