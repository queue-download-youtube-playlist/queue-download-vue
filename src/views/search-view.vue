<template>
  <div class="container-fluid">
    <SearchNav
        :messageSearch="this.messageSearch"
        @click-search-router="this.clickSearchRouter"
    />
  </div>
</template>

<script>

import SearchNav from '../components/search-nav.vue';

export default {
  name: 'search-view',
  components: {
    SearchNav,
  },
  props: {
    messageSearch: {type: Object, default: null},
  },
  methods: {
    clickSearchRouter() {
      this.$emit('click-search-router', null);
    },
  },
};
</script>

<style scoped>

</style>