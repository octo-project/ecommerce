<template>
    <div>
        <h2>Dashboard</h2>
        <div class="flex justify-around">
            <router-link to="/dashboard" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4">Home</router-link>
            <router-link to="/dashboard/accounts" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4">Accounts</router-link>
            <router-link to="/dashboard/carts" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4">Carts</router-link>
            <router-link to="/dashboard/products" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4">Products</router-link>
            <router-link to="/dashboard/invoices" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4">Invoices</router-link>
            <router-link to="/dashboard/settings" class="bg-amber-500 !font-semibold rounded-md text-white py-2 px-4">Settings</router-link>
        </div>
        <router-view/>
    </div>
</template>