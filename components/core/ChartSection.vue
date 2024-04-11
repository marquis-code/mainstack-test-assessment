<template>
  <div class="space-y-3 w-full">
    <section class="flex gap-x-[64px] items-center">
      <div class="space-y-2">
        <p class="text-sm text-[#56616B]">Available Balance</p>
        <h1 class="text-black font-black text-xl lg:text-3xl">USD {{ totalAvailableBalance }}</h1>
      </div>
      <div>
        <button class="text-white text-sm lg:text-base bg-black px-6 py-2.5 rounded-full">Withdraw</button>
      </div>
    </section>
    <div class="chart-container">
      <ApexChart type="line" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransaction } from '@/composables/useTransaction';
const { getTransactions, loading, filterTransactions, filteredTransactions, transactions } = useTransaction()
import ApexChart from 'vue3-apexcharts';

onMounted(() => {
  getTransactions()
})

const data = ref({
  "balance": 750.56,
  "total_payout": 500,
  "total_revenue": 1250.56,
  "pending_payout": 0,
  "ledger_balance": 500
})

// Calculate the total available balance
// Assuming total available balance can be calculated by adding the balance and ledger balance
const totalAvailableBalance = ref(data.value.balance + data.value.ledger_balance)

const totalAmount = ref('')

onMounted(() => {
  totalAmount.value = transactions.value.reduce((accumulator: any, currentObject: any) => {
    return accumulator + currentObject.amount;
  }, 0);

})
const series = ref([
  {
    name: 'Series 1',
    data: [200, 300, 300, 350.56, 400, 500]
  }
]);

const chartOptions = ref({
  chart: {
    height: 50,
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: '',
    align: 'left'
  },
  grid: {
    show: false,
    // row: {
    //   colors: ['transparent'], // takes an array which will be repeated on columns
    //   opacity: 0.5
    // },
  },
  xaxis: {
    categories: ['Feb 20', 'Feb 28', 'Mar 1', 'Mar 1', 'Mar 2', 'Mar 3']
  },
  annotations: {
    points: [{
      x: 'Apr 2',
      seriesIndex: 0,
      label: {
        borderColor: '#775DD0',
        offsetY: 0,
        style: {
          color: '#fff',
          background: '#775DD0',
        },
        text: 'Annotation',
      }
    }]
  },
  yaxis: {
    tickAmount: 4,
    axisBorder: {
      show: false, // Optionally, to remove the axis line
    },
    axisTicks: {
      show: false, // Optionally, to remove the axis ticks
    },
    labels: {
      show: false // Set to false if you also want to hide y-axis labels
    },
    grid: {
      show: false // Removes horizontal grid lines
    }
  },
});

// Setup your chart data and options here...
</script>