<template>
  <div class="flex flex-col h-full">
    <div class="flex pb-4 gap-3 items-center border-b">
      <div class="">
        <button @click="$router.back()"
                class="flex text-white items-center justify-center rounded-full w-10 h-10 bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </button>
      </div>
      <div>
        <h1 class="text-xl font-bold line-clamp-1">{{ $route.query.title }}</h1>
        <h2 class="text-sm font-bold text-primary-700 uppercase">
                  <span v-if="appstore.profile?.type === 'farmer'">
                  <span v-if="$route.query.advisor_name">{{ $route.query.advisor_name }}</span>
                  <span v-else>-no advisor response-</span>
                </span>
          <span v-else>{{ $route.query.farmer_name }}</span>
        </h2>
      </div>
    </div>
    <div class="relative flex flex-col flex-1 h-full">
      <div ref="chat_scroller"
           class="flex flex-col gap-6 h-full absolute w-full pb-16 md:pb-36 pt-8  overflow-y-auto">


        <template v-for="message in messages">
          <div v-if="message.from === user?.uid">
            <div class="flex flex-col items-end">
              <div class="bg-primary-300 p-4 max-w-[90%] md:max-w-[80%] rounded-2xl">
                {{ message.text }}
              </div>
              <div v-if="message.date_created" class="px-3 text-sm">
                {{ useTimeAgo(new Date((message.date_created.seconds * 1000))).value }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col items-start">
              <div class="px-3 font-bold text-primary-700">
               <span v-if="appstore.profile?.type === 'farmer'">
                  <span v-if="$route.query.advisor_name">{{ $route.query.advisor_name }}</span>
                  <span v-else>-no advisor response-</span>
                </span>
                <span v-else>{{ $route.query.farmer_name }}</span>
              </div>
              <div class="bg-primary-700  text-white p-4 max-w-[90%] md:max-w-[80%] rounded-2xl">
                {{ message.text }}
              </div>
              <div v-if="message.date_created" class="px-3 text-sm">
                {{ useTimeAgo(new Date((message.date_created.seconds * 1000))).value }}
              </div>
            </div>
          </div>
        </template>


        <div ref="scroll_ghost"></div>
      </div>
      <div class="absolute bottom-0 w-full">
        <div class="relative pt-4 justify-center flex gap-3 md:gap-4 bg-primary-50">
          <button @click="onScrollToBottom" v-if="!is_at_bottom"
                  class="absolute hover:bg-gray-200 transition-all -top-16 justify-self-center flex p-2 bg-white shadow-xl rounded-full border">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
              <path
                  d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z"></path>
            </svg>
          </button>
          <textarea v-model="message_text" placeholder="Write to the advisor explaining your problems..."
                    class="p-2 px-4 rounded-xl md:rounded-[1.2em] max-h-96 outline-none ring-1 focus:ring-2 w-full ring-primary-400 placeholder-gray-300"
          ></textarea>
          <div>
            <button
                @click="onSendMessage"
                :disabled="!message_text"
                :class="[message_text ?'bg-primary-700 hover:bg-primary-800 shadow':'bg-gray-400']"
                class="flex items-center justify-center text-primary-50 h-10 w-10  md:h-14 md:w-14   rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M3 13.0001H9V11.0001H3V1.8457C3 1.56956 3.22386 1.3457 3.5 1.3457C3.58425 1.3457 3.66714 1.36699 3.74096 1.4076L22.2034 11.562C22.4454 11.695 22.5337 11.9991 22.4006 12.241C22.3549 12.3241 22.2865 12.3925 22.2034 12.4382L3.74096 22.5925C3.499 22.7256 3.19497 22.6374 3.06189 22.3954C3.02129 22.3216 3 22.2387 3 22.1544V13.0001Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {onBeforeUnmount, onMounted, Ref, ref} from "vue";
import {useAppStore} from "../../store/app-store";
import {onSnapshot, serverTimestamp} from "firebase/firestore";
import {Chats} from "../../model/chats";
import {useRoute} from "vue-router";
import {useCurrentUser} from "vuefire";
import {useTimeAgo} from "@vueuse/core";

const appstore = useAppStore();
const user = useCurrentUser();
const route = useRoute();

const scroll_ghost = ref(null);
const chat_scroller = ref(null);
const is_at_bottom = ref(true);


const message_text = ref('');

const messages = ref([]) as Ref<{
  id: string,
  from: string,
  text: string,
  date_created: { seconds: string },
}[]>

let unsub
onMounted(() => {
  handleChatScroller()
  onScrollToBottom()
  messagesSub();
})

const addChatAdvisor = () => {
  if (!route.query.advisor) {
    if (appstore.profile?.type == 'advisor' && appstore.profile.full_name) {
      new Chats().ownChat(route.query.id as string, {
        advisor: user.value?.uid ?? '',
        advisor_name: appstore.profile.full_name
      })
    }
  }
}


const onSendMessage = () => {
  new Chats().setChatMessage(route.query.id as string, {
    from: user.value?.uid ?? '',
    text: message_text.value,
    date_created: serverTimestamp(),
  });
  message_text.value = '';
  addChatAdvisor();
  onScrollToBottom();

}

const messagesSub = () => {
  const mref = new Chats().getChatMessages(route.query.id as string);
  unsub = onSnapshot(mref, (querySnapshot) => {
    const ls = [];
    querySnapshot.forEach((doc) => {
      ls.push({...doc.data(), id: doc.id});
    });
    messages.value = ls;

  });
}

onBeforeUnmount(() => {
  unsub()
})


const onScrollToBottom = () => {
  if (scroll_ghost.value) {
    (scroll_ghost.value as HTMLDivElement).scrollIntoView({behavior: "smooth"})
  }
}

const handleChatScroller = () => {
  if (chat_scroller.value) {
    (chat_scroller.value as HTMLDivElement).addEventListener('scroll', (e) => {
      const element = (e.target as HTMLDivElement);
      is_at_bottom.value = (element.scrollHeight - element.scrollTop - element.clientHeight) < 20;
    })
  }
}


</script>