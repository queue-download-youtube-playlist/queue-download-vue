<template>
  <div
      class="row border my-3"
      v-for="video in this.videoList"
      :key="video.vid"
      :id="video.vid">
    <div class="my-3">
      <button
          class="btn btn-outline-info">{{ video.vid }}
      </button>
      <button class="btn disabled">
        {{ video.quality }}
      </button>
      <button
          class="btn btn-outline-info "
          @click="copyText(video.title)">copy title
      </button>
      <button
          class="btn btn-outline-info "
          @click="copyText(video.description)">copy description
      </button>
      <button
          class="btn btn-outline-info "
          @click="copyText(video.vlink)">copy video url
      </button>
      <button
          class="btn btn-outline-info"
          @click="fetchDownload(video.vid)">download video
      </button>
    </div>
    <div class="my-3">
      <button class="btn disabled">{{ video.author }}</button>
    </div>
    <div class="my-3">
      <button @click="fetchOpen(video.vid)" class="btn btn-outline-primary">{{ video.title }}</button>
    </div>
    <div class="my-3">
      <button
          class="btn btn-outline-danger"
          @click="fetchVideoDelete(video.vid,video.author,false)">delete data
      </button>
      <button
          class="btn btn-outline-danger"
          @click="fetchVideoDelete(video.vid,video.author,true)">
        delete data and mp4 jpg file
      </button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'video-list',
  props: {
    socket: {
      type: Object,
      default: null,
    },
    videoList: {
      type: Object,
      default: {},
    },
    defaultauthor: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      prehost: `http://localhost:16206/`,
    };
  },
  methods: {
    fetchOpen(vid) {
      let input = `${this.prehost}open/${vid}`;
      fetch(input).then();
    },
    fetchDownload(vid) {
      let message = {
        vid,
      };
      let input = `${this.prehost}notice/mp4`;
      let init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      };
      fetch(input, init).then();
    },
    fetchVideoDelete(vid, author, withfile) {
      delete this.videoList[vid];
      this.$emit('delete-vid', vid);

      let length = Object.keys(this.videoList).length;
      if (length === 0) {
        this.$emit('go-allauthor', this.defaultauthor);
        this.$emit('delete-author', author);
        console.log(`author=\n`, author, `\n`);
      }

      let message = {
        vid,
        withfile,
      };
      let input = `${this.prehost}video/`;
      let init = {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      };
      fetch(input, init).then();
      // fetch author again
    },
    copyText(v) {
      window.navigator.clipboard.writeText(v);
    },
  },
};
</script>

<style scoped>

</style>