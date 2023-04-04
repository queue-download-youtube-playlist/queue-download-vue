<template>
  <header>
    <ul class="nav nav-pills">
      <li class="nav-item" id="homeRouter">
        <RouterLink class="nav-link" ref="homeRouter" to="/">
          Home
        </RouterLink>
      </li>
      <li class="nav-item" id="searchRouter">
        <RouterLink class="nav-link" to="/search-view">
          Search
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/playlist-view">
          Playlist
        </RouterLink>
      </li>
      <li class="nav-item">
        <div class="nav-link">
          <span>{{this.info}}</span>
        </div>
      </li>
    </ul>
  </header>
  <main>
    <RouterView
        :socket="this.socket"
        :messageContainer="this.messageContainer"
        :messageQueue="this.messageQueue"
        :messageDownload="this.messageDownload"
        :messageSearch="this.messageSearch"

        @click-search-router="this.clickSearchRouter"
    />
  </main>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      socket: null,
      messageContainer: null,
      messageQueue: null,
      messageDownload: null,
      messageSearch: null,

      info: 'no alive extension',
    };
  },
  watch: {
    messageContainer(newValue, oldValue) {
      if (newValue) {
        let {dowhat, info} = newValue;
        this.info = info;
      }
    },
  },
  methods: {
    clickSearchRouter(){
      document.getElementById('searchRouter').firstElementChild.click();
    },
    switchSocketMessage(message) {
      let action = message['action'];
      if (action.startsWith('n_desk_')) {
        switch (message['whichone']) {
          case 'container':
            this.messageContainer = message;
            break;
          case 'queue':
            this.messageQueue = message;
            break;
          case 'download':
            this.messageDownload = message;
            break;
          case 'search':
            this.messageSearch = message;
            break;

        }
      }
    },
    initSocket() {
      let socket = new WebSocket('ws://localhost:16206');
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({action: 'login_desktop'}));
      });
      socket.addEventListener('close', () => {
      });
      socket.addEventListener('error', () => {
      });
      socket.addEventListener('message', (ev) => {
        let socketmessage = JSON.parse(String(ev.data));
        this.switchSocketMessage(socketmessage);
      });
      this.socket = socket;
    },
  },
  mounted() {
    this.clickSearchRouter();
  },
  created() {
    this.initSocket();
  },
};

</script>

<style scoped>
#app {
  height: 100vh;
  min-width: 768px;
  overflow-x: scroll;
  /* hide scrollbar but allow scrolling */
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
