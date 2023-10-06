<template>
  <div class="absolute top-0 w-full grid grid-cols-2 gap-24 p-8">
    <section data-testid="sortable-post-column">
      <h1 class="title-1 text-white text-lg mb-8">Sortable Post List</h1>
      <div>
        <div
            :data-testid="`post_list_${index}`"
            v-for="(item, index) in postList"
            :key="index"
            class="flex justify-between items-center px-4 py-7 bg-white border rounded-md my-6 shadow-lg"
            :class="item.id === currentMoving ? 'post-movement' : ''"
        >
          <span>Post {{ item.id }}</span>

          <div class="flex flex-col">
            <button
                v-if="index !== 0"
                :data-testid="`post_${index}_button_up`"
                class="text-temper-800"
                @click="postMoving(index, index - 1)"
            >
              <i class="fa-solid fa-chevron-up fa-sm"></i>
            </button>

            <button
                v-if="index !== postList.length - 1"
                :data-testid="`post_${index}_button_down`"
                class="text-temper-800"
                @click="postMoving(index, index + 1)"
            >
              <i class="fa-solid fa-chevron-down fa-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section data-testid="commits-column">
      <div class="shadow-lg rounded-md">
        <div class="bg-white rounded-t-md p-6">
          <h2 class="text-lg text-neutral-600 font-bold">List of actions commited</h2>
        </div>

        <div class="bg-neutral-100 rounded-b-md p-6">
          <div
              v-if="commitList.length === 0"
              data-testid="no_commit_message"
              class="bg-white flex justify-between items-center p-3 rounded-md"
          >
            <span class="text-neutral-700">No action was commited yet :(</span>
          </div>

          <div
              v-else
              v-for="(item, index) in commitList"
              :key="`commit-item-${index}`"
              :data-testid="`commit_item_${index}`"
              class="bg-white flex justify-between items-center p-3"
              :class="[
                  index === 0 ? 'rounded-t-md' : '',
                  index === postList.length - 1 ? 'rounded-b-md' : ''
              ]"
          >
            <span class="text-neutral-700">{{ item.text }}</span>
            <button
                :data-testid="`time_travel_button_${index}`"
                class="bg-lime-400 px-4 py-2.5 rounded-md cursor-pointer"
                @click="timeTravel(index, item)"
            >
              Time travel
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'sortable-list',
  props: {
    postList: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    commitList: [],
    currentMoving: null,
  }),

  methods: {
    postMoving(oldIndex, newIndex, isTimeTravel = false) {
      const post = this.postList[oldIndex];
      this.currentMoving = post.id;
      if (newIndex >= this.postList.length) {
        return;
      }

      this.postList.splice(newIndex, 0, this.postList.splice(oldIndex, 1)[0]);
      if (!isTimeTravel) {
        this.commitList.unshift({
          text: `Moved post ${post.id} from index ${oldIndex} to index ${newIndex}`,
          oldIndex,
          newIndex,
          id: post.id
        });
      }
    },

    timeTravel(index) {
      for (let i = 0; i <= index; i++) {
        let item = this.commitList[i];
        this.postMoving(item.newIndex, item.oldIndex, true);
      }
      this.commitList = this.commitList.slice(index + 1);
    }
  },
}
</script>
<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.post-movement {
  animation: 900ms ease-out 0ms 1 normal forwards running fadeIn;
}
</style>
