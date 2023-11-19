<template>
  <router-view class="relative z-0"></router-view>
  <DialogWrapper :transition-attrs="{name: 'fade'}"/>
</template>
<script lang="ts" setup>
import {DialogWrapper} from "vue3-promise-dialog";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

// onAuthStateChanged(auth!, (user) => {
//     if (user && !route.fullPath.toString().includes('/app')) {
//         router.push({path: '/app'})
//     } else {
//         router.replace({path: '/'})
//     }
// });

</script>