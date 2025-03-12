<template>
    <div className="rounded-lg shadow-lg p-4 bg-white">
        <img :src="product.image" :alt="product.title" className="w-full h-48 object-scale-down rounded" loading="lazy"/>
        <div className="flex flex-col justify-between">
            <div className="flex flex-col flex-grow justify-around min-h-[108px]">
                <h2 className="text-lg font-semibold !mt-2 !text-gray-800 line-clamp-1">{{ product.title }}</h2>
                <p className="text-gray-600 mt-1">{{ product.price }} $</p>
            </div>
            <button @click="goToDetails(product.id)" className="mt-3 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700">View Details</button>
        </div>
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