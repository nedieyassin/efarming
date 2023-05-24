<template>
    <div class="flex flex-col h-full">
        <div class=" pb-2">
            <button @click="$router.back()"
                    class="flex text-white items-center justify-center rounded-full w-10 h-10 bg-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                </svg>
            </button>
        </div>

        <div class="relative flex-1 h-full ">
            <div class="absolute flex w-full h-full overflow-y-auto flex-col gap-4 p-0.5 pb-28 md:pb-3">
                <div class="flex py-4  gap-3">
                    <div>
                        <h1 class="text-3xl font-bold">{{ quickhelp.title }}</h1>
                        <h2 class="text-sm font-bold text-primary-700">
                            {{ useTimeAgo(new Date((quickhelp.date_updated.seconds * 1000))).value }}</h2>
                    </div>
                </div>
<!--                <div class="flex gap-2 flex-wrap">-->
<!--                    <div class="text-primary-700">#chicken</div>-->
<!--                    <div class="text-primary-700">#hens</div>-->
<!--                    <div class="text-primary-700">#disease</div>-->
<!--                    <div class="text-primary-700">#effections</div>-->
<!--                </div>-->
                <div class="prose max-w-full" v-html="quickhelp.body">

                </div>

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>


import {Quickhelp} from "../../model/quickhelp";
import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import {useTimeAgo} from "@vueuse/core";


const route = useRoute();
const quickhelp = reactive({
    title: '',
    type: '',
    body: '',
    date_updated: {seconds: 0},
})

onMounted(() => {
    getQuickhelp();
})
const getQuickhelp = () => {
    new Quickhelp().getQuickHelp(route.query.quickhelp as string).then((res) => {
        const data = res.data();
        if (data) {
            quickhelp.title = data['title'];
            quickhelp.type = data['type'];
            quickhelp.body = data['body'];
            quickhelp.date_updated = data['date_updated'];
        }

    })
}
</script>