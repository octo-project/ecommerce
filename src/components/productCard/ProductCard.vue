<template>
    <div className="border rounded-lg shadow-lg p-4 bg-white">
        <img :src="product.image" :alt="product.title" className="w-full h-48 object-scale-down rounded"/>
        <h2 className="text-lg font-semibold mt-2">{{ product.title }}</h2>
        <p className="text-gray-600 mt-1">{{ product.price }} $</p>
        <button @click="goToDetails(product.id)" className="mt-3 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
    </div>
</template>

<script setup lang="ts">
    import type {PropType} from 'vue';
    import {useRouter} from 'vue-router';

    interface Product {
        id: number; 
        title: string; 
        price: number; 
        image: string;
    }

    defineProps({
        product: Object as PropType<Product>
    })

    const router = useRouter();

    const goToDetails = (productId: number) => {
        router.push(`/product/${productId}`)
    }

</script>