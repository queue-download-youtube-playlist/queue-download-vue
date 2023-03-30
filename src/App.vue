<template>
  <header>
    <ul class="nav nav-pills">
      <li class="nav-item" id="homeRouter">
        <RouterLink
            class="nav-link"
            ref="homeRouter"
            to="/">
          Home
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
            class="nav-link"
            to="/search-view">
          Search View
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink
            class="nav-link"
            to="/queue-view">
          Queue View
        </RouterLink>
      </li>
    </ul>
  </header>
  <main>
    <RouterView
        :socket="this.socket"
        :messageContainer="this.messageContainer"
        :messageQueue="this.messageQueue"
        :messageDownload="this.messageDownload"
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
    };
  },
  methods: {
    clickHomeRouter() {
      document.getElementById('homeRouter')
          .firstElementChild.click()
    },
    switchSocketMessage(message) {
      let action = message['action'];
      if (action.includes('socketinit')) {
        this.socket.uuid = message.uuid;
      } else {
        if (action.startsWith('notice_desktop_')) {

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

          }
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
        let socketmessage = JSON.parse(ev.data);
        this.switchSocketMessage(socketmessage);
      });
      this.socket = socket;
    },
  },
  mounted() {
    this.clickHomeRouter();
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
