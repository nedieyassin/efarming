<template>
  <div class="flex flex-col h-full">
    <div class="md:pb-2">
      <h1 class="text-2xl font-bold">Chats</h1>
      <h2 class="text-sm font-bold text-primary-700">Conversations with
        <span v-if="appstore.profile_farmer">agricultural advisors</span>
        <span v-if="appstore.profile_advisor">farmers</span>
      </h2>
    </div>
    <div class="relative flex-1 h-full ">
      <div class="absolute flex w-full h-full overflow-y-auto flex-col gap-4 ">
        <div class="flex flex-col md:flex-row md:items-center md:gap-3">
          <div v-if="appstore.profile_advisor" class="flex py-2">
            <div class="rounded-full bg-primary-300 flex">
              <button @click="onChooseType('old')"
                      :class="[type === 'old' ? 'bg-primary-700 text-white':'']"
                      class="flex items-center gap-2 px-5 py-2 rounded-3xl">
                <span>Conversations</span>
              </button>
              <button @click="onChooseType('new')"
                      :class="[type === 'new' ? 'bg-primary-700 text-white':'']"
                      class="flex items-center gap-2 px-5 py-2  rounded-3xl">
                <span>New Requests</span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex gap-3 py-2">
          <input type="search"
                 v-model="search_text"
                 placeholder="Search conversations"
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
        <router-link
            v-for="item in list.filter((i)=> i.title.toString().toLowerCase().includes(search_text.toLowerCase()))"
            :to="{path:'/app/chat/room',query:item}"
            class="px-2 py-1 rounded-xl cursor-pointer hover:underline transition-all flex">
          <div>
            <div class="flex text-primary-700 h-10 w-10 rounded-full justify-center items-center bg-primary-200">
              <svg v-if="item.type === 'crop'" xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
              </svg>
              <svg v-if="item.type === 'animal'" xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M17.2809 2.95549C20.2499 3.1584 21.0363 5.29655 21.1199 5.5524L22.4167 5.64758C22.5466 5.64758 22.5858 5.82844 22.471 5.88421C21.148 6.60011 20.7438 8.05479 20.9814 9.00236C21.071 9.35974 21.2346 9.69179 21.3932 10.0224C21.6998 10.6637 22.0441 11.4403 22.1003 13.0033C22.2168 16.2423 19.5895 19.1778 16.3115 19.5956C17.4813 18.4088 18.1256 17.1518 18.4313 16.2207C19.0373 14.375 18.9393 12.9046 18.4857 11.781C18.0385 10.6732 17.2806 9.98965 16.7036 9.63988C15.021 8.62006 13.4846 8.54938 12.2604 8.878C12.7253 8.28379 13.1361 7.6768 13.4596 7.01357C14.0436 5.36416 13.3581 4.1657 12.7563 3.49525C12.5642 3.24941 12.695 2.83984 13.0607 2.83984C14.4703 2.83984 15.8737 2.8604 17.2809 2.95549ZM3.31872 19.1067C5.24275 16.9048 8.0315 13.7133 10.4814 10.9564C11.04 10.3277 13.2499 8.61858 16.2285 10.424C17.1068 10.9564 18.6589 12.589 17.5605 15.9349C16.7576 18.3804 13.1532 23.7301 1.80115 21.7784C1.5741 21.7394 1.29 21.4242 1.58312 21.0905C1.99794 20.6183 2.59759 19.932 3.31872 19.1067Z"></path>
              </svg>
            </div>
          </div>
          <div class="w-full px-2">
            <h1 class="font-bold text-lg line-clamp-1">{{ item.title }}</h1>
            <div class="flex justify-between items-center">
              <div class="text-xs">
                <span v-if="appstore.profile_farmer">
                  <span v-if="item.advisor_name">{{ item.advisor_name }}</span>
                  <span v-else>-no advisor response-</span>
                </span>
                <span v-else>{{ item.farmer_name }}</span>
              </div>
              <div>
                <div class="text-xs">
                  {{ useTimeAgo(new Date((item.date_created.seconds * 1000))).value }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <div class="text-center py-16 text-gray-400" v-if="!is_loading && !list.length">
          No chats
        </div>

        <div v-if="is_loading" class="flex items-center justify-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-14 animate-spin" viewBox="0 0 24 24">
            <path
                d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
          </svg>
        </div>

      </div>
    </div>
    <button
        v-if="appstore.profile_farmer"
        @click="onStartChat"
        class="fixed text-white hover:bg-primary-800 right-4 md:right-8 md:bottom-8 bottom-28 transition-all  justify-self-center flex p-3 md:p-4 bg-primary-700 shadow-xl rounded-full border">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-10" viewBox="0 0 24 24">
        <path fill="currentColor"
              d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 10H8V12H11V15H13V12H16V10H13V7H11V10Z"></path>
      </svg>
    </button>
  </div>
</template>
<script lang="ts" setup>


import {addChatDialog} from "../../components/dialog";
import {onMounted, Ref, ref} from "vue";
import {Quickhelp} from "../../model/quickhelp";
import {v4 as uuidv4} from "uuid";
import {useAppStore} from "../../store/app-store";
import {Chats} from "../../model/chats";
import {useTimeAgo} from "@vueuse/core";
import {serverTimestamp} from "firebase/firestore";
import {useCurrentUser} from "vuefire";


const appstore = useAppStore();
const user = useCurrentUser();

const list = ref([]) as Ref<{
  id: string,
  type: string,
  title: string,
  farmer_name: string,
  advisor_name: string,
  date_created: { seconds: string }
}[]>;

const type = ref('old');

const is_loading = ref(false);
const search_text = ref('');

onMounted(() => {
  getList();
});

const getList = () => {
  if (appstore.profile_farmer) {
    is_loading.value = true;
    new Chats().getChats(user.value?.uid ?? "").then((res) => {
      list.value = res;
      is_loading.value = false;
      // console.log(res);
    }).catch((err) => {
      is_loading.value = false;
      console.log(err);
    })
  } else if (appstore.profile_farmer) {
    advGetList();
  }
}

const onChooseType = (t) => {
  type.value = t;
  advGetList();
}

const advGetList = () => {
  if (type.value === 'old') {
    is_loading.value = true;
    new Chats().getAdvChats(user.value?.uid ?? "").then((res) => {
      list.value = res;
      is_loading.value = false;
      // console.log(res);
    }).catch((err) => {
      is_loading.value = false;
      console.log(err);

    })
  } else {
    is_loading.value = true;
    new Chats().getNewChats().then((res) => {
      list.value = res;
      is_loading.value = false;
      // console.log(res);
    }).catch((err) => {
      is_loading.value = false;
      console.log(err);
    })
  }
}

const onStartChat = () => {
  addChatDialog({}).then((res) => {
    if (res && appstore.profile?.full_name && user.value?.uid) {
      const id = uuidv4();
      new Chats().setChat(id, {
        user_id: user.value?.uid ?? "",
        advisor:'',
        title: res['title'],
        type: res['type'],
        date_created: serverTimestamp(),
        farmer_name: appstore.profile?.full_name as string
      }).then(() => {
        getList();
      })
    }

  })
}


</script>