<template>
    <main class="pb-10 p-6">
        <NavigationBarSection />
        <section class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 max-w-7xl mx-auto mt-[65px]">
            <div class="rounded-lg lg:col-span-2">
                <ChartSection />
            </div>
            <div class="rounded-lg">
                <RevenueStatCard />
            </div>
        </section>
        <section class="mt-[82px]">
            <TransactionsTable />
        </section>
    </main>
</template>

<script>

import TransactionsTable from '@/components/dashboard/TransactionsTable.vue'
import ChartSection from '@/components/core/ChartSection.vue'
import RevenueStatCard from '@/components/dashboard/RevenueStatCard.vue'
import NavigationBarSection from '@/components/core/NavigationBarSection.vue';
export default {
    components: {
        NavigationBarSection,
        RevenueStatCard,
        TransactionsTable,
        ChartSection
    },
};
</script>
