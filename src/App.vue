<template>
  <div class="h-screen bg-neutral-100">
    <div class="diagonal w-full bg-temper-800 relative"></div>
    <sortable-list :post-list="postList" />
  </div>

</template>
<script>
import SortableList from './components/SortableList.vue'
import axios from 'axios';
export default {
  name: 'app',
  props: {},
  components: {
    'sortable-list': SortableList
  },
  data: () => ({
    postList: {},
  }),
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        this.postList = response.data.slice(0, 5);
      }).catch(() => {
        this.postList = [];
        for (let i = 0; i < 5; i ++) {
          this.postList.push({
            userId: 1,
            id: i + 1,
            title: 'aaaa',
            body: 'bbbb',
          })
        }
      });
    },
  },
}
</script>
<style scoped>
.diagonal {
  clip-path: polygon(0 0, 0 67%, 100% 0);
  height: 300px;
}
</style>
