<template>
  <div id="queuearr" class="container-fluid">
    <div class="row border my-3"
         v-for="queue in this.queueList" :key="queue.playlist">
      <div class="col-md-12">
        <button
            @click="fetchOpenNewTab(queue)"
            class="btn disabled">
          {{ queue.title }}
        </button>
      </div>
      <div class="col-auto">
        <button
            class="btn btn-outline-danger"
            @click="fetchQueueDelete(queue)">
          delete this playlist and all sub task
        </button>
      </div>
      <div class="col-2">

      </div>
      <div class="col-auto">
        <button
            @click="fetchGetAllVid(queue)"
            class="btn btn-outline-info">
          get all video id
        </button>
        <button
            class="btn disabled">
          total <span>{{ queue.total }}</span>
        </button>
        <button
            class="btn disabled">
          progress <span>{{ queue.progress }}</span>
        </button>

        <button
            :disabled="queue.total === queue.progress"
            @click="fetchPlaylistDownload(queue)"
            class="btn btn-outline-info">download all video
        </button>

      </div>
    </div>
    <div class="row border my-3" v-if="Object.keys(this.queueList).length === 0">
      <button class="btn disabled">{{this.messageNoQueue}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'queue-list',
  props: {
    socket: {
      type: Object,
      default: null,
    },
    messageQueue: {type: Object, default: null},
  },
  watch: {
    messageQueue(newValue, oldValue) {
      if (newValue) {
        let {dowhat, queue} = newValue;
        if (dowhat) {
          this[dowhat](queue);
        }
      }
    },
  },
  data() {
    return {
      prehost: `http://localhost:16206/`,
      queueList: {},
      messageNoQueue: 'there is no queue for you',
    };
  },
  methods: {
    queueAdd(queue) {
      let {playlist} = queue;
      this.queueList[playlist] = queue;
    },
    queueUpdate(queue) {
      let {playlist} = queue;
      if (this.queueList.hasOwnProperty(playlist)) {
        for (let queueKey in queue) {
          this.queueList[playlist][queueKey] = queue[queueKey]
        }
      }
    },
    fetchPlaylistDownload(queue) {
      let message = {
        queue
      }
      let input = `${this.prehost}queue/download`;
      let init = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      };
      fetch(input, init).then();
    },
    fetchOpenNewTab(queue) {
    },
    fetchQueueDelete(queue) {
      delete this.queueList[queue.playlist];

      let message = {queue};
      let input = `${this.prehost}queue/`;
      let init = {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      };
      fetch(input, init).then();
    },
    fetchGetAllVid(queue) {
      let message = {
        queue,
      };
      let input = `${this.prehost}notice/playlist/`;
      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      };
      fetch(input, init).then();
    },
    fetchQueueAll() {
      let input = `${this.prehost}queue/all`;
      fetch(input).then(v => v.json()).then(v => {
        this.queueList = v;
      });
    },
  },
  created() {
    this.fetchQueueAll();
  },
};
</script>

<style scoped>

</style>