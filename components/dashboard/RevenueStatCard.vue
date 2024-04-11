<template>
    <main>
        <div v-if="Object.keys(wallet).length && !loading" class="space-y-[40px]">
            <div v-for="(value, key) in rearrangedObject" :key="key" class="space-y-[8px]">
                <div class="flex justify-between items-center">
                    <p class="font-light text-[#56616B] text-sm">{{ titleCase(key) }}</p>
                    <img src="@/assets/icons/info.svg" />
                </div>
                <h1 class="text-black font-black text-xl">
                    USD {{ formatMoney(value) }}
                </h1>
            </div>
        </div>
        <div v-else class="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div class="w-full h-[350px] bg-gray-300 rounded mb-2"></div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import useTitleCase from "@/composables/core/useTitleCase";
import { useWallet } from "@/composables/useWallet";
const { getWallet, loading, wallet } = useWallet();
import { useNumberFormatter } from "@/composables/core/useNumberFormatter";
const { formatMoney } = useNumberFormatter();
const titleCase = useTitleCase();

onMounted(() => {
    getWallet();
});

interface RearrangedObject {
    ledger_balance: number;
    total_payout: number;
    total_revenue: number;
    pending_payout: number;
}

const rearrangedObject = computed(() => {
    if (Object.keys(wallet.value).length) {
        const { balance, ...rest } = wallet.value;
        const result: RearrangedObject = {
            ledger_balance: rest.ledger_balance,
            total_payout: rest.total_payout,
            total_revenue: rest.total_revenue,
            pending_payout: rest.pending_payout,
        };

        return result;
    }
});
</script>
