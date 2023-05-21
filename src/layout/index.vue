<template>
    <div class="h-screen overflow-hidden- flex flex-col w-full">
        <Appbar/>
        <div class="h-full flex flex-1">
            <SidebarDesktop class="hidden md:block"/>
            <div class="h-full flex flex-1 md:pr-4 md:pb-4">
                <div class="relative flex-1 bg-primary-200 md:rounded-[2em] p-3 md:p-5">
                    <router-view></router-view>
                    <SidebarMobile v-if="!$route.meta.no_nav"  class=""/>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import SidebarDesktop from './sidebar/desktop.vue'
import SidebarMobile from './sidebar/mobile.vue'
import Appbar from './appbar/index.vue'
import {useRoute} from "vue-router";

const route = useRoute();

</script>
