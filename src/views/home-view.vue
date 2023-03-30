<template>
  <div
    class="container-fluid">

    <DownloadInfo
        :socket="this.socket"
        :messageDownload="this.messageDownload"
    />
    <HeartBeat
        :socket="this.socket"
        :messageContainer="this.messageContainer"
    />
  </div>
</template>

<script>
import DownloadInfo from '../components/download-info.vue';
import HeartBeat from '../components/heart-beat.vue';

export default {
  name: 'home-view',
  components: {
    DownloadInfo,
    HeartBeat
  },
  props: {
    socket: {
      type: Object,
      default: null,
    },
    messageDownload: {type: Object, default: null},
    messageContainer: {type: Object, default: null},
  },
};
</script>

<style scoped>

</style>