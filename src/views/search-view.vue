<template>
  <div class="container-fluid">
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
import VideoList from '../components/video-list.vue';

export default {
  name: 'search-view',
  components: {
    VideoList,
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
    },
    goAllAuthor(e) {
      this.$refs.selectOnAuthor.value = e;
    },
    fetchAllAuthor() {
      let input = `${this.prehost}video/authors`;
      fetch(input).then(v => v.json()).then((value) => {
        this.authorList = value;
      });
    },
    authorChange(event) {
      let val = event.target.value;

      if (val.includes(this.defaultauthor)) {
        this.videoList = null;
      } else {
        let input = `${this.prehost}video/author/${val}`;
        fetch(input).then(v => v.json()).then((value) => {
          this.videoList = value;
        });
      }
    },
  },
  created() {
    this.fetchAllAuthor();
    this.changeSearchType();
  },
};
</script>

<style scoped>

</style>