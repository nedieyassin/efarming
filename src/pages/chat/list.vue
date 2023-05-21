<template>
    <div class="flex flex-col h-full md:px-3">
        <div class="md:pb-2">
            <h1 class="text-2xl font-bold">Chats</h1>
            <h2 class="text-sm font-bold text-primary-700">Conversations with agricultural advisors</h2>
        </div>
        <div class="relative flex-1 h-full ">
            <div class="absolute flex w-full h-full overflow-y-auto flex-col gap-4 ">
                <div class="flex gap-3 py-2">
                    <input type="search"
                           placeholder="Search conversations"
                           class="bg-primary-300 rounded-full focus:bg-primary-400 transition-all md:text-xl p-2 px-6 w-full outline-none placeholder-primary-600">
                    <div>
                        <button class="flex items-center justify-center text-primary-50 h-10 w-10  md:h-14 md:w-14  bg-primary-500 hover:bg-primary-600 shadow rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <router-link v-for="i in 1" to="/app/chat/room"
                             class="px-2 py-1 rounded-xl cursor-pointer hover:underline transition-all flex">
                    <div>
                        <div class="flex text-primary-700 h-10 w-10 rounded-full justify-center items-center bg-primary-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="px-2">
                        <h1 class="font-bold text-lg line-clamp-1">Coughing Chickens and soars on the hens necks </h1>
                        <div class="text-xs">Mr. S Banda</div>
                    </div>
                </router-link>
            </div>
        </div>
        <button
                class="fixed text-white hover:bg-primary-800 right-4 md:right-8 md:bottom-8 bottom-28 transition-all  justify-self-center flex p-3 md:p-4 bg-primary-700 shadow-xl rounded-full border">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-10" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 10H8V12H11V15H13V12H16V10H13V7H11V10Z"></path>
            </svg>
        </button>
    </div>
</template>
<script lang="ts" setup>

</script>