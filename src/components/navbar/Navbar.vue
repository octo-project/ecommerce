<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-white text-xl">E-Commerce</h1>
        <button 
            @click="logout"
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
            Logout
        </button>
    </nav>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router'

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }
</script>