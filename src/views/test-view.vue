<template>
  <div class="container-fluid">
    <div class="row my-3">
      <button class="col-auto" @click="addItem">
        addItem
      </button>
    </div>
    <div class="row my-3">
      <ul v-for="(item, index) in this.testArr">
        <li>
          <span>{{ item }}</span>
          <button @click="deleteItem(index)">delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-view',
  data() {
    return {
      testArr: {},
    };
  },
  methods: {
    addItem() {
      let length = Object.keys(this.testArr).length;
      this.testArr[length] = (`name ${length}`);
    },
    deleteItem(index) {
      delete this.testArr[index];
    },
  },
};
</script>

<style scoped>

</style>