<template>
  <div>
    <div class="row my-3">
      <div class="col-auto">
        <button
            @click="changeSearchType"
            class="btn btn-outline-primary">search type
        </button>
        <button class="btn btn-secondary disabled">
          {{ this.searchTypText }}
        </button>
      </div>
      <div class="col-auto" v-if="searchType">
        <select
            ref="selectOnAuthor"
            class="form-select"
            aria-label="Default select example"
            @change="authorChange">
          <option selected :value="this.defaultauthor">{{ this.defaultauthor }}</option>
          <option :value="author" v-for="author in this.authorList" :key="author">
            {{ author }}
          </option>
        </select>
      </div>
      <div class="col-auto" v-else>
        <label for="vtitle">
          <input
              @input="titleChange"
              class="form-control"
              id="vtitle"
              type="text"
              placeholder="type title to search"
          />
        </label>
      </div>
    </div>
    <VideoList
        :videoList="this.videoList"
        :defaultauthor="this.defaultauthor"
        @delete-vid="deleteVid"
        @go-allauthor="goAllAuthor"
        @delete-author="deleteAuthor"
    />
  </div>
</template>

<script>
import VideoList from './video-list.vue';

export default {
  name: 'search-nav',
  components: {
    VideoList,
  },
  props: {
    messageSearch: {type: Object, default: null},
  },
  watch: {
    async messageSearch(newValue, oldValue) {
      if (newValue) {
        let {dowhat, info} = newValue;
        switch (dowhat) {
          case 'fetchAllAuthor':
            await this.fetchAllAuthor();
            break;
          case 'fetchAuthorVideo':
            // 1 click search router
            this.$emit('click-search-router', null);
            // 2 fetch all author
            await this.fetchAllAuthor();
            // 3 fetch author video
            await this.fetchAuthorVideo(info);
            break;
        }
      }
    },
  },
  data() {
    return {
      prehost: `http://localhost:16206/`,
      defaultauthor: 'All Author',
      authorList: {},
      videoList: {},
      searchType: false,
      searchTypText: '',
    };
  },
  methods: {
    titleChange(event) {
      this.videoList = null;
      let val = event.target.value;
      if (val.length > 0) {
        let input = `${this.prehost}video/title/${val}`;
        fetch(input).then(v => v.json()).then((value) => {
          this.videoList = value;
        });
      }
    },
    changeSearchType() {
      this.searchType = !this.searchType;
      this.searchTypText = this.searchType
          ? 'author'
          : 'title';
      this.videoList = null;
    },
    deleteVid(e) {
      delete this.videoList[e];
    },
    deleteAuthor(e) {
      delete this.authorList[e];
      let input = `${this.prehost}notice/fetchallauthor`;
      fetch(input);
    },
    goAllAuthor(e) {
      this.$refs.selectOnAuthor.value = e;
    },
    async fetchAllAuthor() {
      let input = `${this.prehost}video/authors`;
      let response = await fetch(input);
      let value = await response.json();
      this.authorList = value;
    },
    async fetchAuthorVideo(author) {
      this.$refs.selectOnAuthor.value = author;
      let input = `${this.prehost}video/author/${author}`;
      let response = await fetch(input);
      let value = await response.json();
      this.videoList = value;
    },
    authorChange(event) {
      let val = event.target.value;
      if (val.includes(this.defaultauthor)) {
        this.videoList = null;
      } else {
        this.fetchAuthorVideo(val);
      }
    },
  },
  async created() {
    await this.fetchAllAuthor();
    this.changeSearchType();
  },
};
</script>

<style scoped>

</style>