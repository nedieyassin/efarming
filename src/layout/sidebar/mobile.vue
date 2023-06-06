<template>
  <div class="md:hidden fixed left-0 bg-white py-3 bottom-0 w-full">
    <div class="flex justify-evenly gap-4 select-none">
      <router-link to="/app/home"
                   v-slot="{isActive}"
                   class="group flex cursor-pointer flex-col items-center justify-center">
        <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']"
             class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6"
               viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001Z"></path>
          </svg>
        </div>
        <span class="text-sm text-center">
                            Home
                </span>
      </router-link>
      <router-link to="/app/quick-help"
                   v-slot="{isActive}"
                   class="group flex cursor-pointer flex-col items-center justify-center">
        <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']"
             class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6"
               viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z"></path>
          </svg>
        </div>
        <span class="text-sm text-center">
                            Quick Help
                        </span>
      </router-link>
      <!--                    -->
      <!--                    -->
      <router-link v-if="appstore.profile_admin" to="/app/users"
                   v-slot="{isActive}"
                   class="group flex cursor-pointer flex-col items-center justify-center">
        <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']"
             class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">

          <svg xmlns="http://www.w3.org/2000/svg"
               :class="[isActive ? 'text-primary-800':'']" class="h-6"
               viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
          </svg>

        </div>
        <span class="text-sm text-center">
                           Users
                        </span>
      </router-link>


      <router-link to="/app/profile"
                   v-slot="{isActive}"
                   class="group flex cursor-pointer flex-col items-center justify-center">
        <div :class="[isActive ? 'bg-primary-200':'group-hover:bg-gray-200']"
             class=" transition-all  rounded-full w-16 flex justify-center items-center p-1.5">

          <svg xmlns="http://www.w3.org/2000/svg" :class="[isActive ? 'text-primary-800':'']" class="h-6"
               viewBox="0 0 24 24">
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
import {useAppStore} from "../../store/app-store";

const appstore = useAppStore();
</script>