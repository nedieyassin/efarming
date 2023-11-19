<template>
  <div class="flex flex-col  h-full">
    <div class="pb-4">


      <div class="flex gap-3  pb-4 items-center">
        <button @click="$router.back()"
                class="flex text-white items-center shrink-0 justify-center rounded-full w-10 h-10 bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </button>
        <div class="px-4 w-full">
          <input type="text" v-model="quickhelp.title" placeholder="Enter title"
                 class="px-4 font-bold text-2xl py-1.5 w-full rounded-md outline-none ring-1 ring-gray-600 ">
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:items-center md:gap-3 pb-3">
        <div>
          Choose type of farming
        </div>
        <div class="py-2">
          <div class="rounded-full bg-primary-300 flex">
            <button @click="quickhelp.type='crop'"
                    :class="[quickhelp.type === 'crop' ? 'bg-primary-700 text-white':'']"
                    class="flex items-center gap-2 px-5 py-2 rounded-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
              </svg>
              <span>Crop Farming</span>
            </button>
            <button @click="quickhelp.type='animal'"
                    :class="[quickhelp.type === 'animal' ? 'bg-primary-700 text-white':'']"
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
      <div class="flex gap-3 flex-col md:flex-row justify-between">
        <menu-bar class="p-1" :editor="editor"/>
        <div class="px-3 flex justify-end">
          <button
              @click="save"
              :class="cloudSync.changed ? 'bg-red-500 text-red-50':'bg-green-500 text-green-50'"
              class="flex items-center gap-1 px-4 py-1.5 rounded-3xl">
            <svg v-if="!cloudSync.saving" xmlns="http://www.w3.org/2000/svg" class="h-6"
                 viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M7 20.9811C3.64378 20.7257 1 17.9216 1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811V21H7V20.9811ZM13 13H16L12 8L8 13H11V17H13V13Z"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 animate-spin" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
            </svg>
            <span v-if="cloudSync.saving" class="text-xs animate-pulse">Saving...</span>
            <span v-else-if="cloudSync.has_queue" class="text-xs">Queued</span>
            <span v-else class="text-xs">Saved</span>
          </button>
        </div>
      </div>

    </div>

    <div class="flex-1 h-full border relative bg-white rounded-3xl overflow-y-auto">
      <div class="absolute h-full w-full overflow-y-auto">
        <div class="">
          <editor-content :editor="editor"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {Editor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {Quickhelp} from "../../../services/api/endpoints/quickhelp";
// import {useTimeAgo} from "@vueuse/core";


const router = useRouter();
const route = useRoute();

const id = ref('')
const _quickhelp = new Quickhelp();


const cloudSync = reactive({
  state: '',
  saving: false,
  changed: false,
  has_queue: false,
})

const quickhelp = reactive({
  title: '',
  type: 'crop',
  date_updated: serverTimestamp(),
})
watch(() => quickhelp.title, (o, n) => {
  if (o !== n) {
    update();
  }
})
watch(() => quickhelp.type, (o, n) => {
  if (o !== n) {
    update();
  }
})

const save = () => {
  if (quickhelp.title) {
    cloudSync.saving = true;
    _quickhelp.updateAdd(
        {
          uid: route.query.quickhelp as string,
          title: quickhelp.title,
          type: quickhelp.type,
          date_updated: new Date().toDateString(),
          body: editor.getHTML(),
        }
    ).then(() => {
      cloudSync.saving = false;
      cloudSync.changed = false;
    }).catch(() => {
      cloudSync.saving = false;
    })
  }
}

const update = () => {
  cloudSync.changed = true;
  if (!cloudSync.has_queue) {
    setTimeout(() => {
      save();
      //console.log('saving');
      cloudSync.has_queue = false;
    }, 3000)
    cloudSync.has_queue = true;
  }
}

const editor = new Editor({
  onUpdate() {
    update();
  },
  onCreate() {
    _quickhelp.get(route.query.quickhelp as string).then((res) => {
      const data = res.body;
      if (data) {
        quickhelp.title = data['title'];
        quickhelp.type = data['type'];
      }
      if (data) {
        editor.commands.setContent(data['body']);
      }
    })
  },
  content: '',
  extensions: [
    StarterKit,
    Document,
    Placeholder,
    Paragraph,
    Text,
    Heading,
    Image,
    Link.configure({
      validate: (href: string) => /^https?:\/\//.test(href),
      openOnClick: false,
      HTMLAttributes: {
        class: 'eduq-link'
      }
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    CharacterCount.configure(),
  ],

  editorProps: {
    attributes: {
      class: `prose md:prose-lg lg:prose-xl  p-5 focus:outline-none  min-h-[40vh]  max-w-full z-0  `,
    },
  },
})


</script>