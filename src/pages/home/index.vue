<template>
  <div class="px-3">
    <div class="pb-6">
      <h1 class="text-2xl font-bold">Home</h1>
      <div class="py-6">
        <div class="flex gap-3">
          <div class="bg-white items-center shadow p-6 rounded-xl flex gap-6">
            <h1 class="text-2xl">Farmers helped this month</h1>
            <h1 class="text-2xl font-bold text-primary-700 bg-primary-200 aspect-square w-14 flex justify-center items-center rounded-full">
              {{ users_list.length }}</h1>
          </div>
          <div class="bg-white items-center shadow p-6 rounded-xl flex gap-6">
            <h1 class="text-2xl">Number of quickhelps</h1>
            <h1 class="text-2xl font-bold text-primary-700 bg-primary-200 aspect-square w-14 flex justify-center items-center rounded-full">
              {{ quickhelp_list.length }}</h1>
          </div>
        </div>
      </div>
      <div class="px-6 py-3 text-xl font-bold">
        Quickhelp
      </div>
      <div class="flex flex-col gap-3">
        <template
            v-for="item in quickhelp_list">
          <div
              v-if="item.type"
              class="shadow p-3 cursor-pointer hover:bg-primary-100 hover:ring-1 ring-primary-400 transition-all rounded-2xl bg-white">
            <div class="flex">
              <router-link :to="`/app/quick-help/detail?quickhelp=${item.id}`" class="flex-1">
                <h1 class="text-3xl font-bold p-1">{{ item.title }}</h1>
              </router-link>
            </div>
            <router-link :to="`/app/quick-help/detail?quickhelp=${item.id}`" class="line-clamp-3"
                         v-html="item.body"></router-link>
            <div class="flex items-center gap-3 pt-2">
              <div class="flex items-center">
                <button v-if="item.type === 'crop'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
                  </svg>
                </button>
                <button v-if="item.type === 'animal'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M17.2809 2.95549C20.2499 3.1584 21.0363 5.29655 21.1199 5.5524L22.4167 5.64758C22.5466 5.64758 22.5858 5.82844 22.471 5.88421C21.148 6.60011 20.7438 8.05479 20.9814 9.00236C21.071 9.35974 21.2346 9.69179 21.3932 10.0224C21.6998 10.6637 22.0441 11.4403 22.1003 13.0033C22.2168 16.2423 19.5895 19.1778 16.3115 19.5956C17.4813 18.4088 18.1256 17.1518 18.4313 16.2207C19.0373 14.375 18.9393 12.9046 18.4857 11.781C18.0385 10.6732 17.2806 9.98965 16.7036 9.63988C15.021 8.62006 13.4846 8.54938 12.2604 8.878C12.7253 8.28379 13.1361 7.6768 13.4596 7.01357C14.0436 5.36416 13.3581 4.1657 12.7563 3.49525C12.5642 3.24941 12.695 2.83984 13.0607 2.83984C14.4703 2.83984 15.8737 2.8604 17.2809 2.95549ZM3.31872 19.1067C5.24275 16.9048 8.0315 13.7133 10.4814 10.9564C11.04 10.3277 13.2499 8.61858 16.2285 10.424C17.1068 10.9564 18.6589 12.589 17.5605 15.9349C16.7576 18.3804 13.1532 23.7301 1.80115 21.7784C1.5741 21.7394 1.29 21.4242 1.58312 21.0905C1.99794 20.6183 2.59759 19.932 3.31872 19.1067Z"></path>
                  </svg>
                </button>
              </div>
              <div class="text-xs">
                {{ useTimeAgo(new Date((item.date_updated.seconds * 1000))).value }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div :class="[bot_open ? '':'animate-bounce']"
         class="fixed flex flex-col  gap-3 justify-end items-end right-4 md:right-8 md:bottom-8 bottom-28">
      <div>
        <div v-if="bot_open">
          <Chat/>
        </div>
        <div v-else class="px-6 py-3 rounded-md shadow-2xl bg-white border">
          Ask <b class="text-primary-700">e-farming AI Assistance</b>
        </div>

      </div>
      <div>
        <button
            @click="bot_open = !bot_open"
            class=" text-white hover:bg-primary-600  bg-primary-500  transition-all  justify-self-center flex p-3 md:p-4 shadow-xl rounded-full border">
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
  </div>
</template>
<script lang="ts" setup>

import Chat from "../chat/chat.vue";
import {onMounted, Ref, ref} from "vue";
import {Users} from "../../model/users";
import {Quickhelp} from "../../model/quickhelp";
import {useTimeAgo} from "@vueuse/core";

const bot_open = ref(false);
const users_list = ref([]) as Ref<{
  id: string,
  full_name: string,
  type: string,
}[]>;

const quickhelp_list = ref([]) as Ref<{
  id: string,
  type: string,
  body: string,
  title: string,
  date_updated: { seconds: string }
}[]>;

onMounted(() => {
  getList();
});

const getList = () => {
  new Users().getUsers().then((res) => {
    users_list.value = res;
  });
  new Quickhelp().getQuickHelps().then((res) => {
    quickhelp_list.value = res;
  }).catch(() => {
  })
}


</script>