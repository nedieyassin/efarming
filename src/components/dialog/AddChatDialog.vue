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
            <h1 class="font-bold text-xl text-gray-800">Start Conversation</h1>
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
          <input v-model="form.title"
                 placeholder="Enter Title"
                 class="w-full border-2 border-black py-3 px-3 rounded-md outline-none">
          <div class="flex flex-col">
            <div>
              Choose type of farming
            </div>
            <div class="flex py-2 w-auto">
              <div class="rounded-full bg-primary-300 flex">
                <button @click="form.type='crop'"
                        :class="[form.type === 'crop' ? 'bg-primary-700 text-white':'']"
                        class="flex items-center gap-2 px-5 py-2 rounded-3xl">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
                  </svg>
                  <span>Crop Farming</span>
                </button>
                <button @click="form.type='animal'"
                        :class="[form.type === 'animal' ? 'bg-primary-700 text-white':'']"
                        class="flex items-center gap-2 px-5 py-2  rounded-3xl">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M17.2809 2.95549C20.2499 3.1584 21.0363 5.29655 21.1199 5.5524L22.4167 5.64758C22.5466 5.64758 22.5858 5.82844 22.471 5.88421C21.148 6.60011 20.7438 8.05479 20.9814 9.00236C21.071 9.35974 21.2346 9.69179 21.3932 10.0224C21.6998 10.6637 22.0441 11.4403 22.1003 13.0033C22.2168 16.2423 19.5895 19.1778 16.3115 19.5956C17.4813 18.4088 18.1256 17.1518 18.4313 16.2207C19.0373 14.375 18.9393 12.9046 18.4857 11.781C18.0385 10.6732 17.2806 9.98965 16.7036 9.63988C15.021 8.62006 13.4846 8.54938 12.2604 8.878C12.7253 8.28379 13.1361 7.6768 13.4596 7.01357C14.0436 5.36416 13.3581 4.1657 12.7563 3.49525C12.5642 3.24941 12.695 2.83984 13.0607 2.83984C14.4703 2.83984 15.8737 2.8604 17.2809 2.95549ZM3.31872 19.1067C5.24275 16.9048 8.0315 13.7133 10.4814 10.9564C11.04 10.3277 13.2499 8.61858 16.2285 10.424C17.1068 10.9564 18.6589 12.589 17.5605 15.9349C16.7576 18.3804 13.1532 23.7301 1.80115 21.7784C1.5741 21.7394 1.29 21.4242 1.58312 21.0905C1.99794 20.6183 2.59759 19.932 3.31872 19.1067Z"></path>
                  </svg>
                  <span>Animal Farming</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-3 justify-end">
          <button @click="closeDialog(false)"
                  class="border-2 border-black rounded-full px-6 py-1.5 font-bold hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button @click="closeDialog(form)"
                  :disabled="!form.title"
                  :class="[form.title ?'bg-primary-700 hover:bg-primary-800 shadow':'bg-gray-400']"
                  class="text-white rounded-full px-6 py-1.5 font-bold  transition-colors">
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import {closeDialog} from 'vue3-promise-dialog'
import {onMounted, reactive, ref} from "vue";


const props = defineProps({
  title: {
    type: String,
    default: 'Add',
  },
  action: {
    type: String,
    default: 'Create Conversation',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
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

const form = reactive({
  title: '',
  type: 'crop',
})


</script>
