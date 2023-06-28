<template>
  <div class="px-3">
    <div class="pb-6">
      <h1 class="text-2xl font-bold">Home</h1>
      <div class="py-6">
        <div class="flex gap-3">
          <div class="bg-white items-center shadow p-6 rounded-xl flex gap-6">
            <h1 class="text-2xl">Farmers helped this month</h1>
            <h1 class="text-2xl font-bold text-primary-700 bg-primary-200 aspect-square w-14 flex justify-center items-center rounded-full">
              {{ users_list.length }}</h1>
          </div>
          <div class="bg-white items-center shadow p-6 rounded-xl flex gap-6">
            <h1 class="text-2xl">Number of quickhelps</h1>
            <h1 class="text-2xl font-bold text-primary-700 bg-primary-200 aspect-square w-14 flex justify-center items-center rounded-full">
              {{ quickhelp_list.length }}</h1>
          </div>
        </div>
      </div>

      <div id="chart" class="bg-white items-center shadow p-6 rounded-xl">
        <apexchart type="bar" height="500" :options="chartOptions" :series="series"></apexchart>
      </div>

    </div>
    <div :class="[bot_open ? '':'animate-bounce']"
         class="fixed flex flex-col  gap-3 justify-end items-end right-4 md:right-8 md:bottom-8 bottom-28">
      <div>
        <div v-if="bot_open">
          <Chat/>
        </div>
        <div v-else class="px-6 py-3 rounded-md shadow-2xl bg-white border">
          Ask <b class="text-primary-700">e-farming AI Assistance</b>
        </div>

      </div>
      <div>
        <button
            @click="bot_open = !bot_open"
            class=" text-white hover:bg-primary-600  bg-primary-500  transition-all  justify-self-center flex p-3 md:p-4 shadow-xl rounded-full border">
          <svg v-if="!bot_open" xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-10" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M8 18H18.2372L20 19.3851V9H21C21.5523 9 22 9.44772 22 10V23.5L17.5455 20H9C8.44772 20 8 19.5523 8 19V18ZM5.45455 16L1 19.5V4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V16H5.45455Z"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 md:h-10" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import Chat from "../chat/chat.vue";
import {onMounted, Ref, ref} from "vue";
import {Users} from "../../model/users";
import {Quickhelp} from "../../model/quickhelp";
import {History} from "../../model/history";

const bot_open = ref(false);
const users_list = ref([]) as Ref<{
  id: string,
  full_name: string,
  type: string,
}[]>;

const quickhelp_list = ref([]) as Ref<{
  id: string,
  type: string,
  body: string,
  title: string,
  date_updated: { seconds: string }
}[]>;


const series = ref([
  {
    name: 'Number of Active Farmers',
    // array of 12 random number
    data: [13, 12, 32, 41, 15, 61, 17, 18, 19, 10, 11, 12]
  }
])

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      columnWidth: '60%'
    }
  },
  colors: ['#00E396'],
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    markers: {
      fillColors: ['#00E396', '#775DD0']
    }
  }
})


onMounted(() => {
  getList();
});

const getList = () => {
  new Users().getUsers().then((res) => {
    users_list.value = res;
  });
  new Quickhelp().getQuickHelps().then((res) => {
    quickhelp_list.value = res;
  })
  new History().get().then((res) => {
    series.value = [
      {
        name: 'Number of Active Farmers',
        // array of 12 random number
        data: res
      }
    ]
  })
}


</script>