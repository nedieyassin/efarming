<template>
    <div class="flex items-center flex-wrap">
        <template v-for="(item, index) in items">
            <div class="h-5 w-[2px] bg-gray-300 mx-2" v-if="item.type === 'divider'" :key="`divider${index}`"/>
            <menu-item v-else :key="index"
                       :type="item?.type ?? ''"
                       :icon="item?.icon ?? ''"
                       :title="item?.title ?? ''"
                       :action="item.action || function(){}"
                       :isActive="item?.isActive"
                       :disabled="item?.disabled"

                       v-bind="item"/>
        </template>
    </div>
</template>
<script lang="ts" setup>
import {PropType, ref} from "vue";
import MenuItem from './MenuItem.vue'
import {Editor} from "@tiptap/vue-3";
// import {editorImageDialog, editorLinkDialog} from "@/components/dialogs";

const {editor} = defineProps({
    editor: {
        type: Object as PropType<Editor>,
        required: true,
    },
})

interface Iitem {
    type?: string,
    icon?: string,
    title?: string,
    minimal?: boolean,
    action?: () => any,
    isActive?: () => any,
    disabled?: () => boolean | undefined,
}

let items: Iitem[] = []


if (editor instanceof Editor) {
    items = [
        {
            icon: 'bold',
            title: 'Bold',
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold'),
        },
        {
            icon: 'italic',
            title: 'Italic',
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive('italic'),
        },
        {
            icon: 'h-1',
            title: 'Heading 1',
            action: () => editor.chain().focus().toggleHeading({level: 1}).run(),
            isActive: () => editor.isActive('heading', {level: 1}),
        },
        {
            icon: 'h-2',
            title: 'Heading 2',
            action: () => editor.chain().focus().toggleHeading({level: 2}).run(),
            isActive: () => editor.isActive('heading', {level: 2}),
        },
        {
            icon: 'h-3',
            title: 'Heading 3',
            action: () => editor.chain().focus().toggleHeading({level: 3}).run(),
            isActive: () => editor.isActive('heading', {level: 3}),
        },
        {
            icon: 'paragraph',
            title: 'Paragraph',
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: () => editor.isActive('paragraph'),
        },
        {
            icon: 'list-unordered',
            title: 'Bullet List',
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive('bulletList'),
        },
        {
            icon: 'list-ordered',
            title: 'Ordered List',
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive('orderedList'),
        },
        {
            type: 'divider',
        },
        {
            icon: 'align-left',
            title: 'Align Left',
            action: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: () => editor.isActive({textAlign: 'left'}),
        },
        {
            icon: 'align-center',
            title: 'Align Center',
            action: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: () => editor.isActive({textAlign: 'center'}),
        },
        {
            icon: 'align-right',
            title: 'Align Right',
            action: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: () => editor.isActive({textAlign: 'right'}),
        },
        {
            icon: 'align-justify',
            title: 'Align Justify',
            action: () => editor.chain().focus().setTextAlign('justify').run(),
            isActive: () => editor.isActive({textAlign: 'justify'}),
        },
        {
            type: 'divider',
        },
        {
            icon: 'double-quotes-l',
            title: 'Blockquote',
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive('blockquote'),
        },
        {
            icon: 'text-wrap',
            title: 'Hard Break',
            action: () => editor.chain().focus().setHardBreak().run(),
        },
        // {
        //     icon: 'format-clear',
        //     title: 'Clear Format',
        //     action: () => editor.chain()
        //         .focus()
        //         .clearNodes()
        //         .unsetAllMarks()
        //         .run(),
        //     disabled: () => editor?.state.selection.empty,
        // },
        // {
        //     type: 'divider',
        // },
        // {
        //     icon: 'image-add-fill',
        //     title: 'Add Image',
        //     action: () => {
        //         // editorImageDialog(['uploads', 'unsplash'], tags).then((res: {
        //         //     owner: string,
        //         //     url: string
        //         // } | undefined) => {
        //         //     if (!res) {
        //         //         return false;
        //         //     }
        //         //     if (res?.url) {
        //         //         editor.commands.insertContent(`<img width="100%" src="${res.url}" alt="${res.owner}" />\n`)
        //         //     }
        //         // });
        //     },
        // },
        // {
        //     icon: 'link',
        //     title: 'Link Content',
        //
        //     action: () => {
        //         // editorLinkDialog().then((res: { target: string, href: string } | undefined) => {
        //         //     if (!res) {
        //         //         return false;
        //         //     }
        //         //     if (res?.href) {
        //         //         editor.commands.setLink({href: res.href, target: res.target})
        //         //     }
        //         // });
        //     },
        // },
        {
            type: 'divider',
        },
        {
            icon: 'arrow-go-back-line',
            title: 'Undo',
            action: () => editor.chain().focus().undo().run(),
        },
        {
            icon: 'arrow-go-forward-line',
            title: 'Redo',
            action: () => editor.chain().focus().redo().run(),
        },
    ];
}

</script>
