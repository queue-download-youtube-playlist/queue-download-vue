<template>
  <PlaylistList
      :socket="this.socket"
      :messageQueue="this.messageQueue"
  />
</template>

<script>

import PlaylistList from '../components/playlist-list.vue';

export default {
  name: 'queue-view',
  components: {
    PlaylistList,
  },
  props: {
    socket: {
      type: Object,
      default: null,
    },
    messageQueue: {type: Object, default: null},
  },
};
</script>

<style scoped>

</style>