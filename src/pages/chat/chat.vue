<script lang="ts" setup>

import {onMounted, Ref, ref} from "vue";
import {Bot} from "../../services/api/endpoints/bot";


const scroll_ghost = ref(null);
const chat_scroller = ref(null);
const is_at_bottom = ref(true);
const _bot = new Bot();

const is_typing = ref(false);
const messages = ref<Record<string, any>[]>([])
const options = ref<Record<string, any>[]>([]);


const getParents = () => {
  is_typing.value = true;
  options.value = [];
  messages.value = [{
    role: 'chatbot',
    content: 'Hi, I am an I-Farm chatbot, how can i help you?'
  }];
  _bot.getParents().then((res) => {
    options.value = res.body;
    is_typing.value = false;
  }).catch(() => {
    is_typing.value = false;
  })
}

const selectOption = (option: Record<string, any>) => {

  is_typing.value = true;
  messages.value.push({
    role: 'user',
    content: option.message
  })

  messages.value.push({
    role: 'chatbot',
    content: option.response
  })


  _bot.getChildren(option.id).then((res) => {
    options.value = res.body ? res.body : [];
    is_typing.value = false;
  }).catch(() => {
    is_typing.value = false;
  })


}


onMounted(() => {
  handleChatScroller();
  onScrollToBottom();
  getParents();
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
<template>
  <div class="flex flex-col h-[70vh] w-full  md:w-100 bg-white overflow-clip md:rounded-3xl shadow-2xl">
    <div class="flex p-4 gap-3 items-center border-b">
      <div>
        <h1 class="text-xl font-bold line-clamp-1">I-FARM CHATBOT</h1>
      </div>
    </div>
    <div class="relative flex flex-col flex-1 h-full">
      <div ref="chat_scroller"
           class="flex flex-col gap-6 px-3 h-full absolute w-full pb-16 md:pb-36 pt-8  overflow-y-auto">

        <template v-for="message in messages">
          <div v-if="message.role === 'user'">
            <div class="flex flex-col items-end">
              <div class="bg-primary-300 p-4 max-w-[90%] md:max-w-[80%] rounded-2xl">
                {{ message.content }}
              </div>
            </div>
          </div>
          <div v-else-if="message.role === 'chatbot'">
            <div class="flex flex-col items-start">
              <div class="px-3 font-bold text-primary-700">
                CHATBOT
              </div>
              <div class="bg-primary-700  text-white p-4 max-w-[90%] md:max-w-[80%] rounded-2xl">
                {{ message.content }}
              </div>
            </div>
          </div>


        </template>

        <div v-if="is_typing">
          <div class="flex flex-col items-start">
            <div class="px-3 font-bold text-primary-700">
              CHATBOT
            </div>
            <div class="bg-primary-700  text-white p-4 max-w-[90%] md:max-w-[80%] rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 animate-spin" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M11.9995 2C12.5518 2 12.9995 2.44772 12.9995 3V6C12.9995 6.55228 12.5518 7 11.9995 7C11.4472 7 10.9995 6.55228 10.9995 6V3C10.9995 2.44772 11.4472 2 11.9995 2ZM11.9995 17C12.5518 17 12.9995 17.4477 12.9995 18V21C12.9995 21.5523 12.5518 22 11.9995 22C11.4472 22 10.9995 21.5523 10.9995 21V18C10.9995 17.4477 11.4472 17 11.9995 17ZM20.6597 7C20.9359 7.47829 20.772 8.08988 20.2937 8.36602L17.6956 9.86602C17.2173 10.1422 16.6057 9.97829 16.3296 9.5C16.0535 9.02171 16.2173 8.41012 16.6956 8.13398L19.2937 6.63397C19.772 6.35783 20.3836 6.52171 20.6597 7ZM7.66935 14.5C7.94549 14.9783 7.78161 15.5899 7.30332 15.866L4.70525 17.366C4.22695 17.6422 3.61536 17.4783 3.33922 17C3.06308 16.5217 3.22695 15.9101 3.70525 15.634L6.30332 14.134C6.78161 13.8578 7.3932 14.0217 7.66935 14.5ZM20.6597 17C20.3836 17.4783 19.772 17.6422 19.2937 17.366L16.6956 15.866C16.2173 15.5899 16.0535 14.9783 16.3296 14.5C16.6057 14.0217 17.2173 13.8578 17.6956 14.134L20.2937 15.634C20.772 15.9101 20.9359 16.5217 20.6597 17ZM7.66935 9.5C7.3932 9.97829 6.78161 10.1422 6.30332 9.86602L3.70525 8.36602C3.22695 8.08988 3.06308 7.47829 3.33922 7C3.61536 6.52171 4.22695 6.35783 4.70525 6.63397L7.30332 8.13398C7.78161 8.41012 7.94549 9.02171 7.66935 9.5Z"></path>
              </svg>
            </div>

          </div>
        </div>

        <div class="py-3 px-3 space-y-2">
          <div class="font-bold text-primary-700 ">
            Choose an option
          </div>
          <div v-if="!is_typing" class="space-y-2">
            <button v-for="option in options" :key="option.id" @click="selectOption(option)"
                    class="bg-primary-200 w-full text-primary-700 p-3 rounded-md border hover:bg-primary-300 transition-colors border-primary-700">
              {{ option.message }}
            </button>
            <div v-if="options.length === 0" class="space-y-2">
              <div>
                Sorry, this is all i help you with this right now.
              </div>
              <div class="flex flex-col gap-3">
                <router-link to="/app/notifications"
                             class="bg-primary-200 text-center w-full text-primary-700 p-3 rounded-md border hover:bg-primary-300 transition-colors border-primary-700">
                  <b>Contact Agriculture Advisor for more help</b>
                </router-link>
                <button
                    @click="getParents"
                    class="bg-primary-200 w-full text-primary-700 p-3 rounded-md border hover:bg-primary-300 transition-colors border-primary-700">
                  <b>Start another session</b>
                </button>
              </div>
            </div>
          </div>

        </div>


        <div ref="scroll_ghost"></div>
      </div>
      <div class="absolute bottom-0 w-full">
        <div class="relative pt-4 justify-center flex gap-3 md:gap-4 p-3">
          <button @click="onScrollToBottom" v-if="!is_at_bottom"
                  class="absolute hover:bg-gray-200 transition-all -top-10 justify-self-center flex p-2 bg-white shadow-xl rounded-full border">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
              <path
                  d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
