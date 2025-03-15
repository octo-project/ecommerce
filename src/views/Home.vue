<template>
    <div class="w-full">
        <NavBar/>
        <div className="p-5 overflow-x-hidden">
            <h1 className="text-2xl font-bold !mb-4">Latest Products</h1>
            <div v-if="loading" className="text-center">Loading ...</div>
            <div v-else-if="error" className="text-red-500">{{error}}</div>
            <div v-else className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ProductCard v-for="product in products" :key="product.id" :product="product"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import NavBar from '@/components/navbar/Navbar.vue';
    import ProductCard from '@/components/productCard/ProductCard.vue';

    const error = ref(null);
    const products = ref([]);
    const loading = ref(true);

    onMounted(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:5001/product-list", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("product : ",response.data);
            
            products.value = response.data.data
        } catch (err) {
            error.value = "Failed to load products";
        } finally {
            loading.value = false;
        }
    })

</script>