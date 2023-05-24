<template>
    <div class="flex flex-col  h-full">
        <div class="pb-4">


            <div class="flex gap-3  pb-6 items-center">
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
            <div class="flex justify-between">
                <menu-bar class="p-1" :editor="editor"/>
                <div class="px-3">
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
import {serverTimestamp} from "firebase/firestore";
import {Quickhelp} from "../../../model/quickhelp";
// import {useTimeAgo} from "@vueuse/core";


const router = useRouter();
const route = useRoute();

const id = ref('')


const cloudSync = reactive({
    state: '',
    saving: false,
    changed: false,
    has_queue: false,
})

const quickhelp = reactive({
    title: '',
    type: '',
    date_updated: serverTimestamp(),
})
watch(() => quickhelp.title, () => {
    update();
})

const save = () => {
    cloudSync.saving = true;
    new Quickhelp().setQuickHelp(
        route.query.quickhelp as string,
        {
            title: quickhelp.title,
            type: quickhelp.type,
            date_updated: serverTimestamp(),
            body: editor.getHTML(),
        }
    ).then(() => {
        cloudSync.saving = false;
        cloudSync.changed = false;
    }).catch(() => {
        cloudSync.saving = false;
    })
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
        new Quickhelp().getQuickHelp(route.query.quickhelp as string).then((res) => {
            const data = res.data();
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