<template>
    <div class="flex h-[100vh] w-full bg-gray-700">
        <div class="flex flex-col bg-white py-2 fixed !h-full px-1 gap-2 min-w-[200px] max-w-[450px]">
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

<style>
    body {
        background: #364153;
    }
</style>