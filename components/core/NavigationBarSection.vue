<template>
    <main>
        <header class="bg-white rounded-full shadow border-[0.4px]">
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="md:flex md:items-center md:gap-12">
                        <NuxtLink to="/" class="block text-teal-600" href="#">
                            <span class="sr-only">Home</span>
                            <img src="@/assets/icons/logo.svg" class="h-8 w-8" />
                        </NuxtLink>
                    </div>

                    <div class="hidden md:block">
                        <nav aria-label="Global">
                            <ul class="flex items-center gap-6 text-sm">
                                <li v-for="item in navbarItems" :key="item.name">
                                    <NuxtLink :to="item.url"
                                        :class="[item.name === 'Revenue' ? 'bg-black text-white py-2.5 px-6 rounded-full' : 'text-[#56616B] hover:text-gray-500/75']"
                                        class="font-medium flex items-center gap-x-2 transition" href="#">
                                        <img :src="item.icon" class="h-4 w-4" />
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="sm:flex sm:gap-4">
                            <a class="rounded-full bg-white text-white flex justify-center items-center" href="#">
                                <img src="@/assets/icons/notification.svg" class="h-8 w-8" />
                            </a>

                            <div class="hidden sm:flex">
                                <a class="rounded-full bg-white text-white flex justify-center items-center" href="#">
                                    <img src="@/assets/icons/message.svg" class="h-8 w-8" />
                                </a>
                            </div>
                            <div class="hidden sm:flex">
                                <a class="px-1 pl-2 pr-2.5 py-1.5 flex items-center gap-x-3 bg-gray-100 rounded-full text-sm font-medium"
                                    href="#">
                                    <!-- <img src="@/assets/icons/userLogo.svg" class="h-8 w-8" /> -->
                                    <p
                                        class="text-white bg-gradient-to-r from-[#5C6670] to-[#131316] text-sm flex justify-center items-center font-semibold rounded-full h-10 w-10">
                                        {{ computedUserInitials || '' }}</p>
                                    <img src="@/assets/icons/hamburger.svg" class="h-8 w-8" />
                                </a>
                            </div>
                        </div>

                        <div class="block md:hidden">
                            <button @click="isMobileSidebarOpen = true"
                                class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div v-if="isMobileSidebarOpen" class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
            <!--
              Off-canvas menu backdrop, show/hide based on off-canvas menu state.
        
              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <div class="fixed inset-0 bg-gray-900/80"></div>

            <div class="fixed inset-0 flex">
                <!--
                Off-canvas menu, show/hide based on off-canvas menu state.
        
                Entering: "transition ease-in-out duration-300 transform"
                  From: "-translate-x-full"
                  To: "translate-x-0"
                Leaving: "transition ease-in-out duration-300 transform"
                  From: "translate-x-0"
                  To: "-translate-x-full"
              -->
                <div class="relative mr-16 flex w-full max-w-xs flex-1">
                    <!--
                  Close button, show/hide based on off-canvas menu state.
        
                  Entering: "ease-in-out duration-300"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "ease-in-out duration-300"
                    From: "opacity-100"
                    To: "opacity-0"
                -->
                    <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button @click="sMobileSidebarOpen = false" type="button" class="-m-2.5 p-2.5">
                            <span class="sr-only">Close sidebar</span>
                            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Sidebar component, swap this element with another sidebar if you like -->
                    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                        <div class="flex h-16 shrink-0 items-center">
                            <!-- <img class="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"> -->
                            <NuxtLink to="/" class="block text-teal-600" href="#">
                                <span class="sr-only">Home</span>
                                <img src="@/assets/icons/logo.svg" class="h-8 w-8" />
                            </NuxtLink>
                        </div>
                        <nav class="flex flex-1 flex-col">
                            <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" class="-mx-2 space-y-3">
                                        <li v-for="(item, idx) in navbarItems" :key="idx">
                                            <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
                                            <a href="#" @click.native="isMobileSidebarOpen = false"
                                                class="text-gray-700 text-base group flex gap-x-3 rounded-md p-2 leading-6 font-semibold">
                                                <img :src="item.icon" alt="icon" class="h-6 w-6" />
                                                {{ item.name }}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import home from '@/assets/icons/home.svg'
import analytics from '@/assets/icons/analytics.svg'
import revenue from '@/assets/icons/revenue.svg'
import crm from '@/assets/icons/crm.svg'
import apps from '@/assets/icons/apps.svg'
const { getUser, loading, user } = useUser()
const router = useRouter()
const route = useRoute()
const isMobileSidebarOpen = ref(false)
getUser()
const computedUserInitials = computed(() => {
    if (Object.keys(user.value).length) {
        const firstInitial = user.value.first_name.charAt(0).toUpperCase();
        const lastInitial = user.value.last_name.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`
    }
})
const navbarItems = ref([
    {
        url: '/',
        icon: home,
        name: 'Home'
    },
    {
        url: '/',
        icon: analytics,
        name: 'Analytics'
    },
    {
        url: '/',
        icon: revenue,
        name: 'Revenue'
    },
    {
        url: '/',
        icon: crm,
        name: 'CRM'
    },
    {
        url: '/',
        icon: apps,
        name: 'Apps'
    }
])
</script>