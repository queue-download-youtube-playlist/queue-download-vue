<template>
  <div class="row my-3">
    <div class="col-auto">
      <button class="btn disabled">
        extension connect:
      </button>
      <button class="btn disabled" v-if="this.info">
        {{ this.info }}
      </button>
      <button class="btn disabled" v-else>
        {{ this.messageNoHeartBeat }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'heart-beat',
  props: {
    socket: {
      type: Object,
      default: null,
    },
    messageContainer: {type: Object, default: null},
  },
  watch: {
    messageContainer(newValue, oldValue) {
      if (newValue) {
        let {dowhat, info} = newValue;
        this.info = info;
      }
    },
  },
  data() {
    return {
      info: null,
      messageNoHeartBeat:`there is no alive extension for you`
    };
  },
};
</script>

<style scoped>

</style>