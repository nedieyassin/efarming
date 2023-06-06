<template>
  <div class="flex flex-col h-[70vh] w-100 bg-white overflow-clip rounded-3xl shadow-2xl">
    <div class="flex p-4 gap-3 items-center border-b">
      <div>
        <h1 class="text-xl font-bold line-clamp-1">E-FARMING AI ASSISTANT</h1>
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
          <div v-else-if="message.role === 'assistant'">
            <div class="flex flex-col items-start">
              <div class="px-3 font-bold text-primary-700">
                AI ASSISTANT
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
              AI ASSISTANT
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


        <div ref="scroll_ghost"></div>
      </div>
      <div class="absolute bottom-0 w-full">
        <div class="relative pt-4 justify-center flex gap-3 md:gap-4 bg-primary-50 p-3">
          <button @click="onScrollToBottom" v-if="!is_at_bottom"
                  class="absolute hover:bg-gray-200 transition-all -top-16 justify-self-center flex p-2 bg-white shadow-xl rounded-full border">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
              <path
                  d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z"></path>
            </svg>
          </button>
          <textarea v-model="message_text" placeholder="Ask Assistant solutions to your problems"
                    class="p-2 px-4 rounded-xl md:rounded-[1.2em] max-h-96 outline-none ring-1 focus:ring-2 w-full ring-primary-400 placeholder-gray-300"></textarea>
          <div>
            <button
                @click="onSendMessage"
                :disabled="!message_text"
                :class="[message_text ?'hover:bg-primary-600  bg-primary-500 shadow':'bg-gray-400']"
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

import {onMounted, Ref, ref} from "vue";
import {useAppStore} from "../../store/app-store";
import {useRoute} from "vue-router";
import {useCurrentUser} from "vuefire";
import {ChatGPT} from "../../services/openai";
import {ChatCompletionRequestMessageRoleEnum} from "openai";

const appstore = useAppStore();
const user = useCurrentUser();
const route = useRoute();

const scroll_ghost = ref(null);
const chat_scroller = ref(null);
const is_at_bottom = ref(true);


const is_typing = ref(false);


const message_text = ref('');

const messages = ref([
  {
    role: 'assistant',
    content: 'Hi, i am an AI assistant from e-farming, how can i help you?'
  }
]) as Ref<{
  role: ChatCompletionRequestMessageRoleEnum,
  content: string,
}[]>

let unsub
onMounted(() => {
  handleChatScroller();
  onScrollToBottom();
  // messagesSub();
})


const onSendMessage = () => {
  if (message_text.value) {
    const ls: { role: ChatCompletionRequestMessageRoleEnum, content: string }[] = [
      ...messages.value,
      {
        role: 'user',
        content: message_text.value
      }
    ];

    messages.value = ls;
    message_text.value = '';

    is_typing.value = true;
    new ChatGPT().prompt(ls).then((res) => {
      messages.value.push(res.data.choices[0].message);
      is_typing.value = false;

      setTimeout(() => {
        onScrollToBottom();
      }, 500)
    })
  }
}


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