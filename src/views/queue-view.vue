<template>
  <QueueList
      :socket="this.socket"
      :messageQueue="this.messageQueue"
    />
</template>

<script>

import QueueList from '../components/queue-list.vue';

export default {
  name: 'queue-view',
  components: {
    QueueList
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