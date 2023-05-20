<template>
    <div class="h-full w-24">
        <div class="flex flex-col gap-4 select-none">
            <!--                    -->
            <router-link to="/app/home"
                         v-slot="{isActive}"
                         class="group flex cursor-pointer flex-col items-center justify-center">
                <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']" class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001Z"></path>
                    </svg>
                </div>
                <span class="text-sm text-center">
                            Home
                </span>
            </router-link>
            <!--                    -->
            <router-link to="/app/quick-help"
                         v-slot="{isActive}"
                         class="group flex cursor-pointer flex-col items-center justify-center">
                <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']" class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z"></path>
                    </svg>
                </div>
                <span class="text-sm text-center">
                            Quick Help
                        </span>
            </router-link>
            <!--                    -->
            <router-link to="/app/chat"
                         v-slot="{isActive}"
                         class="group flex cursor-pointer flex-col items-center justify-center">
                <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']" class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242Z"></path>
                    </svg>
                </div>
                <span class="text-sm text-center">
                           Chat
                        </span>
            </router-link>
            <!--                    -->
            <div class="border-t mx-4">

            </div>
            <!--                    -->
            <router-link to="/app/profile"
                         v-slot="{isActive}"
                         class="group flex cursor-pointer flex-col items-center justify-center">
                <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']" class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">

                    <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"></path>
                    </svg>
                </div>
                <span class="text-sm text-center">
                           Profile
                </span>
            </router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>