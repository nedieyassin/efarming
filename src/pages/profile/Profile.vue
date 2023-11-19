<template>
  <div class="px-3">
    <div class="pb-6">
      <h1 class="text-2xl font-bold">Profile</h1>
    </div>
    <div>
      <div class="flex flex-col items-center justify-center">
        <div class="flex justify-center items-center h-40 w-40 bg-primary-200 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20" viewBox="0 0 24 24">
            <path
                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
          </svg>
        </div>
        <div class="text-center">
          <div class="flex items-center gap-3 relative pt-10">
            <h1 class="text-4xl  font-bold">{{ appstore.profile?.full_name }}</h1>
            <button @click="updateName"
                    class="-right-10 absolute h-10 w-10 rounded-full text-primary-700 flex justify-center items-center hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M9.24264 18.9964H21V20.9964H3V16.7538L12.8995 6.85431L17.1421 11.0969L9.24264 18.9964ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"></path>
              </svg>
            </button>
          </div>
          <div class="flex flex-col items-center justify-center relative">
            <h1 class="text-primary-700 font-bold">-{{ appstore.profile?.type }}-</h1>
            <h1 class="text-primary-700">{{ user?.email }}</h1>
          </div>
        </div>
        <div class="flex flex-col gap-3 border-t py-6 my-6">
          <button @click="updatePassword"
                  class="px-6 py-2 rounded-full bg-primary-500 hover:bg-primary-600  text-white">
            Change Password
          </button>
          <button
              @click="logout"
              class="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600  text-white">
            Logout
          </button>
        </div>
        <div v-if="appstore.profile_admin" class="flex flex-col gap-3 border-t py-6 my-6 md:hidden">
          <router-link to="/app/users"
                       class="px-6 py-2 rounded-full bg-primary-500 hover:bg-primary-600  text-white">
            Users
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {addDialog} from "../../components/dialog";
import {useRouter} from "vue-router";
import {onMounted, Ref, ref} from "vue";
import {useAppStore} from "../../store/app-store";


const router = useRouter();
const appstore = useAppStore();
const user = ref();

onMounted(() => {
  getProfile();
})

const getProfile = () => {
  appstore.getProfile()
}


const updateName = () => {
  addDialog({title: 'Update Name', action: 'Update', value: appstore.profile?.full_name as string}).then((res) => {
    if (res) {
      appstore.updateName(res).then(() => {

      }).catch(() => {

      })
    }
  })
}

const updatePassword = () => {
  addDialog({title: 'Update Password', action: 'Change'}).then(() => {
    setTimeout(() => {
      addDialog({title: 'Confirm Password', action: 'Confirm'}).then(() => {

      })
    }, 500)
  })
}

const logout = () => {
  router.replace({path: '/'}).then(() => {
    appstore.logout()
  });
}
</script>