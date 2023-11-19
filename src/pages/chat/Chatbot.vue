<script setup lang="ts">

import Chat from "./chat.vue";
import {ref} from "vue";


const bot_open = ref(false);
</script>

<template>
  <div :class="[bot_open ? '':'animate-bounce']"
       class="fixed flex flex-col  gap-3 justify-end items-end right-0 md:right-8 md:bottom-8 bottom-28 z-50 w-full md:w-auto">
    <div class="w-full">
      <div v-if="bot_open">
        <Chat/>
      </div>
      <div v-else class="px-6 py-3 rounded-md shadow-2xl bg-white border hidden md:block">
        <b class="text-primary-700">Ask I-Farm Chatbot</b>
      </div>

    </div>
    <div>
      <button
          @click="bot_open = !bot_open"
          class=" text-white hover:bg-primary-600  bg-primary-500  transition-all  justify-self-center flex p-3 md:p-4 shadow-xl rounded-full border mr-3 md:mx-0">
        <svg v-if="!bot_open" xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-10" viewBox="0 0 24 24">
          <path
              fill="currentColor"
              d="M8 18H18.2372L20 19.3851V9H21C21.5523 9 22 9.44772 22 10V23.5L17.5455 20H9C8.44772 20 8 19.5523 8 19V18ZM5.45455 16L1 19.5V4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V16H5.45455Z"></path>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-10" viewBox="0 0 24 24">
          <path
              fill="currentColor"
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>