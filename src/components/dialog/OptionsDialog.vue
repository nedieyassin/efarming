<template>
  <Transition name="fade">
    <div class="flex fixed justify-center top-0 items-center w-screen h-screen">
      <div @click="closeDialog(false)" style="background-color: rgba(53,53,53,0.43);"
           class="fixed top-0 left-0 h-screen w-screen  z-50">
      </div>
      <div :class="width" :style="style"
           class="bg-white relative mx-2 md:mx-0 z-50 rounded-2xl shadow-xl p-4 md:p-8">
        <div class="flex justify-between items-center pl-2">
          <div>
            <h1 class="font-bold text-xl text-gray-800">{{ title }}</h1>
          </div>
          <div title="Close">
            <svg @click="closeDialog(false)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 width="24"
                 height="24"
                 class="h-14 w-14 cursor-pointer transition-all hover:bg-red-100 text-gray-800 hover:text-red-700 rounded-full p-3">
              <path
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
            </svg>
          </div>
        </div>
        <div class="flex flex-col gap-3 py-6">
          <button v-for="option  in options"
                  class="py-3 rounded-md bg-gray-100 capitalize hover:bg-primary-800 hover:text-white transition-all text-center"
                  @click="closeDialog(option)">{{ option }}
          </button>
        </div>
        <div class="flex gap-3 justify-end">
          <button @click="closeDialog(false)"
                  class="border-2 border-black rounded-full px-6 py-1.5 font-bold hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import {closeDialog} from 'vue3-promise-dialog'

defineProps({
  title: {
    type: String,
    default: 'Alert',
  },
  options: {
    type: Array,
    default: () => [],
  },
  width: {
    type: String,
    default: 'w-100',
  },
  style: {
    type: String,
    default: '',
  },
});
</script>
