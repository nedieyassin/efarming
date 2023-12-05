<template>
  <div class="px-1 md:px-4">
    <div class="pb-32">
      <h1 class="text-2xl font-bold">Home</h1>
      <div class="py-6 w-full">
        <div class="flex flex-col md:flex-row gap-3">
          <div class="bg-white items-center shadow p-6 rounded-xl flex gap-6">
            <h1 class="text-2xl">Farmers helped this month</h1>
            <h1 class="text-2xl font-bold text-primary-700 bg-primary-200 aspect-square w-14 flex justify-center items-center rounded-full">
              {{ reduce(_stats?.stats ?? []) }}</h1>
          </div>
          <div class="bg-white items-center shadow p-6 rounded-xl flex gap-6">
            <h1 class="text-2xl">Number of quickhelps</h1>
            <h1 class="text-2xl font-bold text-primary-700 bg-primary-200 aspect-square w-14 flex justify-center items-center rounded-full">
              {{ _stats?.quick_helps }}</h1>
          </div>
        </div>
      </div>

      <div id="chart" class="bg-white w-full items-center shadow p-6 rounded-xl">
        <apexchart type="bar" height="500" :options="chartOptions" :series="series"></apexchart>
      </div>

    </div>
    <Chatbot/>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import Chatbot from "../chat/Chatbot.vue";
import {Auth} from "../../services/api/endpoints/auth";

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

const _stats = ref<Record<string, any> | undefined>(undefined);

const _auth = new Auth();

const reduce = (arr: any[], field = 'count') => {
  return arr.reduce((a: number, b: any) => a + b[field], 0);
}

const series = ref([
  {
    name: 'Number of Active Farmers',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
  _auth.stats().then((res) => {


    _stats.value = res.body;

    res.body.stats.forEach((stat: any) => {
      series.value[0].data[stat.month - 1] = stat.count;
    });


  })


  // new Users().getUsers().then((res) => {
  //   users_list.value = res;
  // });
  // new Quickhelp().getQuickHelps().then((res) => {
  //   quickhelp_list.value = res;
  // })
  // new History().get().then((res) => {
  //   series.value = [
  //     {
  //       name: 'Number of Active Farmers',
  //       // array of 12 random number
  //       data: res
  //     }
  //   ]
  // })
}


</script>