<template>
    <div class="flex h-[100vh] w-full bg-gray-700">
        <div class="flex flex-col bg-white py-2 fixed !h-full px-1 gap-2 min-w-[200px] max-w-[450px]">
            <button
                @click="handleLogout"
                class="flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                    />
                </svg>
                <span>Log out</span>
            </button>
            <router-link to="/dashboard" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4 btn-icon --home">Home</router-link>
            <router-link to="/dashboard/accounts" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4 btn-icon --account">Accounts</router-link>
            <router-link to="/dashboard/carts" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4 btn-icon --cart">Carts</router-link>
            <router-link to="/dashboard/products" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4 btn-icon --product">Products</router-link>
            <router-link to="/dashboard/invoices" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4 btn-icon --invoice">Invoices</router-link>
            <router-link to="/dashboard/settings" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4 btn-icon --setting">Settings</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router';
    import { useUserStore } from '@/stores/user-store';

    const router = useRouter();
    const store = useUserStore();

    const handleLogout = () => {
        store.clearAuthUser();
        router.push("/login");
    }
</script>

<style>
    body {
        background: #364153;
    }
</style>