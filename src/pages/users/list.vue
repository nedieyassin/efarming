<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="md:pb-6">
        <h1 class="text-2xl font-bold">Users</h1>
        <h2 class="text-sm font-bold text-primary-700">List of users on the system</h2>
      </div>
    </div>
    <div class="flex gap-3 py-4">
      <input type="search"
             placeholder="Type to search"
             v-model="search_text"
             class="bg-primary-100 rounded-full focus:bg-primary-200 transition-all md:text-xl p-2 px-6 w-full outline-none placeholder-primary-600">
      <div>
        <button
            class="flex items-center justify-center text-primary-50 h-10 w-10  md:h-14 md:w-14  bg-primary-500 hover:bg-primary-600 shadow rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="relative flex-1 h-full select-none ">
      <div class="absolute rounded-2xl flex w-full h-full overflow-y-auto flex-col gap-4 p-0.5 pb-28 md:pb-3">

        <template
            v-for="item in list.filter((i)=> i.full_name.toString().toLowerCase().includes(search_text.toLowerCase()))">
          <div
              class="shadow p-3  hover:bg-primary-100 hover:ring-1 ring-primary-400 transition-all rounded-2xl bg-white">
            <div class="flex">
              <div class="flex flex-col flex-1 ">
                <h1 class="text-2xl p-1">{{ item.full_name }}</h1>
                <h1 class="px-1 font-bold text-primary-700  capitalize">{{ item.type }}</h1>
              </div>
              <div class="flex gap-2">
                <button
                    @click="onEdit(item.user_id)"
                    v-if="item.user_id !== user?.user_id"
                    class="flex items-center justify-center h-12 w-12 rounded-full bg-primary-500 hover:bg-primary-600  shadow text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M16.7574 2.99666L9.29145 10.4626L9.29886 14.7097L13.537 14.7023L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"></path>
                  </svg>
                </button>

                <button
                    @click="onDelete(item.user_id)"
                    v-if="item.user_id !== user?.user_id"
                    class="flex items-center justify-center h-12 w-12 rounded-full bg-red-500 hover:bg-red-600  shadow text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>

        <div v-if="is_loading" class="flex items-center justify-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-14 animate-spin" viewBox="0 0 24 24">
            <path
                d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
          </svg>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {v4 as uuidv4} from 'uuid';
import {onMounted, Ref, ref} from "vue";
import {useAppStore} from "../../store/app-store";
import {alertDialog, optionsDialog} from "../../components/dialog";
import {Users} from "../../services/api/endpoints/users";

const id = uuidv4();

const appstore = useAppStore();
const user = appstore.profile;
const _users = new Users();


const list = ref([]) as Ref<{
  user_id: string,
  full_name: string,
  type: string,
}[]>;

const is_loading = ref(false);
const search_text = ref('');

onMounted(() => {
  getList();
});

const getList = () => {
  is_loading.value = true;
  _users.get().then((res) => {
    list.value = res.body;
    is_loading.value = false;
    // console.log(res);
  }).catch(() => {
    is_loading.value = false;

  })
}
const onEdit = (id: string) => {
  optionsDialog({
    title: 'Change user role',
    options: [
      'admin',
      'advisor',
      'farmer',
    ]
  }).then((res) => {
    if (res) {
      // new Users().updateUser(id, {type: (res as string).toLowerCase()}).then(() => {
      //   getList();
      // })

      _users.changeRole(id, (res as string).toLowerCase()).then(() => {
        getList();
      })
    }
  })
}
const onDelete = (id: string) => {
  alertDialog({
    title: 'Are you sure?',
    message: 'This action will delete this user permanently, continue?',
    action: 'Confirm and Delete'
  }).then((res) => {
    _users.delete(id).then(() => {
      getList();
    })
  })
}


</script>