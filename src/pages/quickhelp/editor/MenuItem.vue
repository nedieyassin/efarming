<template>
    <button
            class="h-8 w-8 border-0 rounded-lg inline-flex items-center justify-center mr-1"
            :class="[
          (isActive ? isActive(): null) ? 'bg-black text-white':(disabled ? disabled(): null) ? 'bg-white text-gray-400':'hover:bg-gray-300  hover:text-white-'
          ]"
            @click="(disabled ? disabled(): null) ?? action()"
            :title="title"
    >
        <i :class="`ri-${icon} ri-sm-`"></i>
    </button>
</template>
<script lang="ts" setup>
defineProps({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    action: {
        type: Function,
        required: true,
    },
    isActive: {
        type: Function,
        default: null,
    },
    disabled: {
        type: Function,
        default: null,
    },
},);
</script>
