<template>
  <div class="flex w-full items-center justify-center h-screen flex-col">
    <div>
      <div class="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 text-primary-600" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M21.998 7V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V14L11.0169 13.0007C11.2719 9.64413 14.0762 7 17.498 7H21.998ZM5.99805 3C9.0904 3 11.7144 5.00519 12.6408 7.78626C11.1417 9.06119 10.1516 10.9143 10.0144 13.0004L8.99805 13C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805Z"></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-center">i-farm</h1>
      <div class="py-6 md:w-96 w-full">
        <form @submit.prevent="login" class="flex flex-col gap-3 py-6">
          <div v-if="message" class="text-red-400">
            {{ message }}
          </div>
          <div>
            <label for="email">Email</label>
            <input v-model="auth_form.email_address"
                   type="email"
                   id="email"
                   required
                   placeholder="Enter email"
                   class="w-full border-2 border-black py-1.5 px-3 rounded-md outline-none">
          </div>
          <div>
            <label for="password">Password</label>
            <input v-model="auth_form.password"
                   :type="show_password ? 'text':'password'"
                   id="password"
                   required
                   placeholder="Enter password"
                   class="w-full border-2 border-black py-1.5 px-3 rounded-md outline-none">
          </div>
          <div @click="show_password = !show_password" class="underline cursor-pointer">
                       <span v-if="show_password">
                           Hide password
                       </span>
            <span v-else>
                          Show password
                       </span>
          </div>
          <div>
            <button type="submit"
                    :disabled="is_loading || !auth_form.password ||!auth_form.email_address "
                    :class="[!is_loading && auth_form.password && auth_form.email_address ?'bg-primary-500 hover:bg-primary-600 shadow':'bg-gray-400']"
                    class="flex justify-center w-full text-center gap-4 py-3 px-5 transition-all   rounded-md  text-white">
              <span v-if="!is_loading">Login</span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 animate-spin" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
              </svg>
            </button>
          </div>
          <div>
            If you don't have an account,
            <router-link to="/register" class="font-bold text-primary-700 hover:underline">Register
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from "../../store/app-store";


const router = useRouter();
const appstore = useAppStore();

//
const is_loading = ref(false);
const message = ref('');
const show_password = ref(false);
//
const auth_form = reactive({
  email_address: '',
  password: ''
})


const login = () => {
  // router.push({path: '/app'});
  // return;
  if (!is_loading.value) {
    is_loading.value = true;
    appstore.login(auth_form).then(() => {
      is_loading.value = false;
      router.push({path: '/app'});
    }).catch((e) => {
      message.value = e.message;
      setTimeout(() => message.value = '', 5000)
      is_loading.value = false;
    })

    // signInWithEmailAndPassword(auth!, auth_form.email, auth_form.password)
    //     .then(async (userCredential) => {
    //       await new History().set(userCredential.user.uid);
    //       appstore.getProfile(userCredential.user.uid).then(() => {
    //         is_loading.value = false;
    //         router.push({path: '/app'});
    //       })
    //
    //     })
    //     .catch((error) => {
    //       message.value = error.message;
    //       setTimeout(() => message.value = '', 5000)
    //       is_loading.value = false;
    //     });
  }
}
</script>