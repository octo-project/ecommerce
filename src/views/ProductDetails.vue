<template>
    <div>
        <div v-if="loading" className="text-center">Loading ...</div>
        <div v-else-if="error" className="text-red-500">{{ error }}</div>
        <div v-else>
            <img :src="product.image" :alt="product.title" className="w-full h-64 object-scale-down rounded"/>
            <h1 className="text-2xl font-bold mt-4">{{ product.title }}</h1>
            <p className="text-gray-600 mt-2">{{ product.description }}</p>
            <p className="text-xl font-semibold mt-4">
                Price : {{ product.price }} $
            </p>
            <button className="mt-4 cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import {useRoute} from 'vue-router';

    interface ProductDetail {
        id: number; 
        title: string; 
        price: number; 
        image: string;
        description: string; 
    }

    const route = useRoute();
    const loading = ref<Boolean>(true);
    const error = ref<string | null>(null);
    const product = ref<ProductDetail | null>(null);
    
    onMounted( async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
            product.value = response.data
        } catch (error) {
            error.value = "Failed to load product details";   
        } finally {
            loading.value = false;
        }
    })
    
</script>