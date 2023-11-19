<template>
  <div class="fixed top-0 left-0 z-50 h-20 bg-white w-full flex items-center gap-4 px-6 py-4 md:py-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 text-primary-600" viewBox="0 0 24 24">
      <path fill="currentColor"
            d="M21.998 7V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V14L11.0169 13.0007C11.2719 9.64413 14.0762 7 17.498 7H21.998ZM5.99805 3C9.0904 3 11.7144 5.00519 12.6408 7.78626C11.1417 9.06119 10.1516 10.9143 10.0144 13.0004L8.99805 13C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805Z"></path>
    </svg>
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl font-bold">I-FARM</h1>
      <button @click="handleLogout" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6">
          <path
              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useAppStore} from "../../store/app-store";

const router = useRouter();
const appstore = useAppStore();

const handleLogout = () => {
  router.replace({path: '/'}).then(() => {
    appstore.logout()
  });
}
</script>