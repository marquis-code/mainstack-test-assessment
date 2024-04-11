<template>
    <main>
        <section class="max-w-7xl mx-auto space-y-[33px]">
            <div class="border-gray-50  border-b pb-6 space-y-6 lg:space-y-0 lg:flex justify-between items-center">
                <div>
                    <h1 class="text-xl font-black text-black">{{ transactions.length }} Transactions</h1>
                    <p class="text-sm text-[#56616B]">Your transactions for the last 7 days</p>
                </div>
                <div class="flex items-center gap-x-6">
                    <button @click="showModal = true"
                        class="rounded-full px-6 py-2.5 bg-[#EFF1F6] text-[#131316] flex justify-between text-sm items-center gap-x-2 font-semibold">Filter<img
                            src="@/assets/icons/caret.svg" alt="" /></button>
                    <button @click="exportData" :disabled="downloading"
                        class="rounded-full px-6 py-2.5 bg-[#EFF1F6] disabled:opacity-25 disabled:cursor-not-allowed text-[#131316] flex justify-between text-sm items-center gap-x-2 font-semibold">
                        {{ downloading ? 'downloading..' : 'Export list' }}
                        <img v-if="!downloading" src="@/assets/icons/download.svg" alt="" /></button>
                </div>
            </div>
            <div v-if="transactions.length && !loading" class="space-y-6">
                <div v-for="(item, idx) in transactions" :key="idx">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-x-3">
                            <img src="@/assets/icons/inflow.svg" v-if="item.type === 'deposit'"
                                class="bg-[#E3FCF2] p-3 rounded-full" />
                            <img src="@/assets/icons/outflow.svg" v-if="item.type === 'withdrawal'"
                                class="bg-[#F9E3E0] p-3 rounded-full" />
                            <div>
                                <p class="text-sm font-medium">{{ item?.metadata?.product_name ?? 'N/A' }}</p>
                                <p v-if="item.status"
                                    :class="[item.status === 'successful' ? 'text-[#0EA163]' : 'text-[#A77A07]']"
                                    class="text-xs font-light text-gray-400">{{ item.status }}</p>
                                <p v-else class="text-xs font-light text-gray-400">{{ item?.metadata?.name ?? 'N/A' }}
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-between items-end flex-col">
                            <p class="font-semibold text-[#131316] text-xs">USD {{ item?.amount ?? 'N/A' }}</p>
                            <p class="text-[#56616B] text-xs">{{ item?.date ?? 'N/A' }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="loading && !transactions.length" class="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div class="w-full h-32 bg-gray-300 rounded mb-2"></div>
            </div>
            <div v-else class="flex justify-center items-center pt-10 pb-20">
                <div>
                    <div class="space-y-4">
                        <img src="@/assets/icons/reciept.svg" alt="" class="bg-[#EFF1F6] p-3 rounded-xl" />
                        <h1 class="text-2xl font-semibold text-black max-w-sm leading-relaxed">No matching transaction
                            found
                            for
                            the
                            selected filter
                        </h1>
                        <p class="text-sm text-gray-400 max-w-sm">Change your filters to see more results, or add a
                            new product.</p>
                        <button @click="clearAllFilterFields"
                            class="text-[#131316] bg-[#EFF1F6] font-semibold text-sm px-6 py-2.5 rounded-full">Clear
                            Filter</button>
                    </div>
                </div>
            </div>
        </section>
        <CoreBaseModal :show="showModal" @update:show="showModal = $event">
            <section class="space-y-6 h-[700px] pt-3">
                <div>
                    <p class="font-semibold text-[#131316] text-lg">Filter</p>
                </div>
                <div class="flex justify-between items-center gap-x-3 px-0">
                    <button v-for="(item, idx) in filterData" :key="idx"
                        class="rounded-2xl w-full border border-gray-100 px-1 text-gray-800 text-xs font-semibold py-2">{{
                        item.text }}</button>
                </div>

                <div class="space-y-3">
                    <h1 class="font-semibold text-gray-900 text-sm">Date Range</h1>

                    <div class="flex justify-between items-center gap-x-3">
                        <div class="">
                            <datepicker class="w-full" v-model="dateFrom"></datepicker>
                        </div>
                        <div class="">
                            <datepicker class="w-full" v-model="dateTo"></datepicker>
                        </div>
                    </div>
                </div>
                <div class="space-y-1.5">
                    <h1 class="font-semibold text-gray-900 text-sm">Transaction Type</h1>
                    <div class="relative inline-block text-left w-full" ref="transactionTypeTarget">
                        <div class="w-full">
                            <button @click="showDropdown = true" type="button"
                                :class="[showDropdown ? 'border-[#1C1B1F] border-4' : '']"
                                class="w-full  gap-x-1.5 rounded-xl relative  bg-[#EFF1F6] px-3 h-14 text-sm font-medium text-gray-900 shadow-sm"
                                id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <div class="flex flex-wrap gap-3">
                                    <p class="text-base rounded-full">{{ computedSelectedItems }}</p>
                                </div>
                                <div class=" flex justify-end items-end absolute right-4 top-5 ">
                                    <svg class="-mr-1 h-5 cursor-pointer w-5 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                        </div>


                        <div v-if="showDropdown"
                            class="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1 space-y-2.5" role="none">
                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                <label :for="item.text" v-for="item in transactionTypes" :key="item.value"
                                    class="text-[#131316] cursor-pointer group flex items-center gap-x-3 font-medium px-4 py-2 text-base"
                                    role="menuitem" tabindex="-1" id="menu-item-0">
                                    <input @change="handleChange(item.text, $event.target.checked)" :value="item.text"
                                        :name="item.text" :id="item.text" type="checkbox" class="h-4 w-4" />
                                    {{ item.text }}
                                </label>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="space-y-1.5">
                    <h1 class="font-semibold text-gray-900 text-sm">Transaction Status</h1>
                    <div class="relative inline-block text-left w-full" ref="transactionStatusTarget">
                        <div class="w-full">
                            <button @click="showStatusDropdown = true" type="button"
                                :class="[showStatusDropdown ? 'border-[#1C1B1F] border-4' : '']"
                                class="w-full  gap-x-1.5 rounded-xl relative  bg-[#EFF1F6] px-3 h-14 text-sm font-medium text-gray-900 shadow-sm"
                                id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <div class="flex flex-wrap gap-3">
                                    <p class="text-base rounded-full">{{ computedSelectedTransactionStatus }}</p>
                                </div>
                                <div class=" flex justify-end items-end absolute right-4 top-5">
                                    <svg class="-mr-1 h-5 cursor-pointer w-5 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                        </div>


                        <div v-if="showStatusDropdown"
                            class="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1 space-y-2.5" role="none">
                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                <label :for="item.text" v-for="item in transactionStatus" :key="item.value"
                                    class="text-[#131316] cursor-pointer group flex items-center gap-x-3 font-medium px-4 py-2 text-base"
                                    role="menuitem" tabindex="-1" id="menu-item-0">
                                    <input @change="handleStatusChange(item.value, $event.target.checked)"
                                        :name="item.text" :id="item.text" type="checkbox" class="h-4 w-4" />
                                    {{ item.text }}
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div class="flex justify-between items-center gap-x-10">
                <button @click="clearAllFilterFields"
                    class="w-full py-3 text-sm rounded-full border border-gray-400 text-gray-900 font-medium">Clear</button>
                <button @click="applyFilters"
                    class="w-full py-3 text-sm rounded-full bg-black text-white font-medium">Apply</button>
            </div>
        </CoreBaseModal>
    </main>
</template>

<script lang="ts" setup>
import { useWallet } from "@/composables/useWallet";
import { useTransaction } from '@/composables/useTransaction';
import Datepicker from 'vuejs3-datepicker';
import { onClickOutside } from '@vueuse/core'
import { useFormatDate } from '@/composables/core/useFormatDate';
import { useExportToCsv } from '@/composables/core/useExportToCsv';
const { exportToCsv } = useExportToCsv();
const { formatDate } = useFormatDate();
const { getWallet, loading: loadingWallet, wallet } = useWallet();
const { getTransactions, loading, filterTransactions, filteredTransactions, transactions } = useTransaction()
const transactionTypeTarget = ref(null)
const transactionStatusTarget = ref(null)

onClickOutside(transactionTypeTarget, event => showDropdown.value = false)
onClickOutside(transactionStatusTarget, event => showStatusDropdown.value = false)
const startDate = ref(new Date()) as Record<string, any>
const endDate = ref(new Date()) as Record<string, any>
const downloading = ref(false)
const showDropdown = ref(false)
const showModal = ref(false);
const selectedTransactionsStatus = ref([]) as Record<string, any>
const selectedTransactionTypes = ref([]) as Record<string, any>

onMounted(() => {
    getTransactions()
})


const exportData = () => {
    downloading.value = true
    setTimeout(() => {
        exportToCsv('transactions-data.csv', transactions.value);
        downloading.value = false
    }, 5000);
};

const filterData = ref([
    {
        text: 'Today',
        value: ''
    },
    {
        text: 'Last 7 days',
        value: ''
    },
    {
        text: 'This month',
        value: ''
    },
    {
        text: 'Last 3 months',
        value: ''
    }
])

const transactionTypes = ref([
    {
        text: 'Store Transactions',
        value: 'store_transactions'
    },
    {
        text: 'Get Tipped ',
        value: 'get_tripped'
    },
    {
        text: 'Withdrawals',
        value: 'withdrawals'
    },
    {
        text: 'Chargebacks',
        value: 'chargebacks'
    },
    {
        text: 'Cashbacks',
        value: 'cashbacks'
    },
    {
        text: 'Refer & Earn',
        value: 'refer_rarn'
    }
])

const transactionStatus = ref([
    {
        text: 'Successful',
        value: 'successful'
    },
    {
        text: 'Pending',
        value: 'pending'
    },
    {
        text: 'Failed',
        value: 'failed'
    }
])


const handleChange = (value: string, checked: boolean) => {
    if (checked) {
        const isAlreadyExisting = selectedTransactionTypes.value.includes(value)
        if (isAlreadyExisting) {
            return
        } else {
            selectedTransactionTypes.value.push(value);
        }
    } else {
        const index = selectedTransactionTypes.value.indexOf(value);
        if (index > -1) {
            selectedTransactionTypes.value.splice(index, 1);
        }
    }
}

const showStatusDropdown = ref(false)

const handleStatusChange = (value: string, checked: boolean) => {
    if (checked) {
        selectedTransactionsStatus.value.push(value);
    } else {
        const index = selectedTransactionsStatus.value.indexOf(value);
        if (index > -1) {
            selectedTransactionsStatus.value.splice(index, 1);
        }
    }
}

const computedSelectedItems = computed(() => {
    return selectedTransactionTypes.value.join(',')
})

const computedSelectedTransactionStatus = computed(() => {
    return selectedTransactionsStatus.value.join(',')
})
const clearAllFilterFields = () => {
    selectedTransactionsStatus.value = []
    selectedTransactionTypes.value = []
    startDate.value = ''
    endDate.value = ''
    showModal.value = false
}

const form = ref({
    startDate: '',
    endDate: ''
})

const dateFrom = ref(formatDate(form.value.startDate))
const dateTo = ref(formatDate(form.value.endDate))
const selectedStatuses = ref<string[]>(['successful', 'pending']);
const selectedTypes = ref<string[]>(selectedTransactionTypes.value);
const selectedProductNames = ref<string[]>(selectedTransactionTypes.value);

const applyFilters = () => {
    const result = filterTransactions(dateFrom.value, dateTo.value, selectedStatuses.value, selectedTypes.value, selectedProductNames.value);
    showModal.value = false
}

</script>