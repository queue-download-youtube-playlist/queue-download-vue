<template>
  <div>
    <div class="row my-3">
      <div class="col-auto">
        <button class="btn  disabled">
          downloading info:
        </button>
        <button class="btn disabled" v-if="this.vid">
          {{ this.info }}
        </button>
        <button class="btn disabled" v-else >
          no downloading...
        </button>
      </div>
    </div>
    <div class="row my-3" v-if="this.vid">
      <div class="col-auto">
        <button class="btn  disabled">
          title
        </button>
        <button class="btn disabled">
          {{ this.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'download-info',
  props: {
    socket: {
      type: Object,
      default: null,
    },
    messageDownload: {
      type: Object, default: null,
    },
  },
  watch: {
    messageDownload(newValue, oldValue) {
      if (newValue) {
        let {dowhat, data} = newValue;
        if (dowhat.includes('updateInfo')) {
          this.updateInfo(data);
        }else if (dowhat.includes('cleanInfo')){
          this.cleanInfo()
        }
      }
    },
  },
  data() {
    return {
      prehost: `http://localhost:16206/`,
      vid: null,
      title: null,
      info: null,
    };
  },
  methods: {
    updateInfo(data) {
      let {vid, title, info} = data;
      this.vid = vid;
      this.title = title;
      this.info = info;
    },
    cleanInfo(){
      this.vid = null; this.title = null; this.info = null;
    }
  },
};
</script>

<style scoped>

</style>