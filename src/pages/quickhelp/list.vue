<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="md:pb-6">
        <h1 class="text-2xl font-bold">Quick Help</h1>
        <h2 class="text-sm font-bold text-primary-700">Explore solutions to common agricultural problems</h2>
      </div>
      <div v-if="appstore.profile_admin" class="py-3 md:py-0">
        <router-link :to="`/app/quick-help/add?quickhelp=${id}`"
                     class="flex justify-center gap-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-600  shadow text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
          </svg>
          <span>Add new quick help</span>
        </router-link>
      </div>
    </div>
    <div class="flex flex-col md:flex-row md:items-center md:gap-3">
      <div>
        Choose type of farming
      </div>
      <div class="py-2">
        <div class="rounded-full bg-primary-300 flex">
          <button @click="type='crop'"
                  :class="[type === 'crop' ? 'bg-primary-700 text-white':'']"
                  class="flex items-center gap-2 px-5 py-2 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
            </svg>
            <span>Crop Farming</span>
          </button>
          <button @click="type='animal'"
                  :class="[type === 'animal' ? 'bg-primary-700 text-white':'']"
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
    <div class="flex gap-3 py-4">
      <input type="search"
             placeholder="Type to search"
             v-model="search_text"
             class="bg-primary-100 rounded-full focus:bg-primary-200 transition-all md:text-xl p-2 px-6 w-full outline-none placeholder-primary-600">
      <div>
        <button
            class="flex items-center justify-center text-primary-50 h-10 w-10  md:h-14 md:w-14  bg-primary-500 hover:bg-primary-600 shadow rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="relative flex-1 h-full select-none ">
      <div class="absolute rounded-2xl flex w-full h-full overflow-y-auto flex-col gap-4 p-0.5 pb-28 md:pb-3">

        <template
            v-for="item in list.filter((i)=> i.title.toString().toLowerCase().includes(search_text.toLowerCase()))">
          <div
              v-if="item.type  === type"
              class="shadow p-3 cursor-pointer hover:bg-primary-100 hover:ring-1 ring-primary-400 transition-all rounded-2xl bg-white">
            <div class="flex">
              <router-link :to="`/app/quick-help/detail?quickhelp=${item.id}`" class="flex-1">
                <h1 class="text-3xl font-bold p-1">{{ item.title }}</h1>
              </router-link>
              <div class="flex gap-2" v-if="appstore.profile?.type === 'admin'">
                <router-link
                    class="flex items-center justify-center h-12 w-12 rounded-full bg-primary-500 hover:bg-primary-600  shadow text-white"
                    :to="`/app/quick-help/add?quickhelp=${item.id}`">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M16.7574 2.99666L9.29145 10.4626L9.29886 14.7097L13.537 14.7023L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"></path>
                  </svg>
                </router-link>

                <button
                    @click="onDelete(item.id)"
                    class="flex items-center justify-center h-12 w-12 rounded-full bg-red-500 hover:bg-red-600  shadow text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path>
                  </svg>
                </button>
              </div>
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

        <div v-if="is_loading" class="flex items-center justify-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-14 animate-spin" viewBox="0 0 24 24">
            <path
                d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
          </svg>
        </div>

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
import {v4 as uuidv4} from 'uuid';
import {Quickhelp} from "../../model/quickhelp";
import {onMounted, Ref, ref} from "vue";
import {useTimeAgo} from '@vueuse/core'
import {useAppStore} from "../../store/app-store";
import {alertDialog} from "../../components/dialog";
import Chat from "../chat/chat.vue";

const id = uuidv4();

const appstore = useAppStore()

const list = ref([]) as Ref<{
  id: string,
  type: string,
  body: string,
  title: string,
  date_updated: { seconds: string }
}[]>;

const is_loading = ref(false);
const bot_open = ref(false);
const search_text = ref('');
const type = ref('crop');

onMounted(() => {
  getList();
});

const getList = () => {
  is_loading.value = true;
  new Quickhelp().getQuickHelps().then((res) => {
    list.value = res;
    is_loading.value = false;
    // console.log(res);
  }).catch(() => {
    is_loading.value = false;

  })
}
const onDelete = (id: string) => {
  alertDialog({
    title: 'Are you sure?',
    message: 'This action will delete this quickhelp permanently, continue?',
    action: 'Confirm and Delete'
  }).then((res) => {
    if (res) {
      new Quickhelp().deleteQuickHelp(id).then(() => {
        getList();
      })
    }
  })
}


</script>