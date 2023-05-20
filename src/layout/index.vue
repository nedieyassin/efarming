<template>
    <div class="h-screen flex flex-col w-full">
        <Appbar/>
        <div class="h-full flex flex-1">
            <Sidebar/>
            <div class="h-full flex flex-1 pr-4 pb-4">
                <div class="flex-1 bg-primary-50 rounded-[2em] p-5">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Sidebar from './sidebar/index.vue'
import Appbar from './appbar/index.vue'
import {useRoute} from "vue-router";

const route = useRoute();

</script>
