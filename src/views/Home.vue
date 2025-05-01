<template>
    <div class="w-full">
        <NavBar/>
        <div className="p-5 overflow-x-hidden">
            <h1 className="text-2xl font-bold !mb-4">Latest Products</h1>
            <div v-if="isLoading" className="text-center">Loading ...</div>
            <div v-else-if="error" className="text-red-500">{{error}}</div>
            <div v-else className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ProductCard v-for="product in products" :key="product.id" :product="product"/>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { ref, watch } from 'vue';
    import { ProductType } from "@/types/type";
    import { useQuery } from '@tanstack/vue-query';
    import { useUserStore } from '@/stores/user-store';
    import NavBar from '@/components/navbar/Navbar.vue';
    import { productList } from '@/services/productServices';
    import ProductCard from '@/components/productCard/ProductCard.vue';

    /**
     * Get connected user data from authUser
     */
    const {authUser} = useUserStore();  

    /**
     * Querying product list
     */
    const {data, isLoading, error} = useQuery({
        staleTime: 1000 * 60,
        refetchOnMount: true,
        enabled: !!authUser.token,
        refetchOnWindowFocus: true,
        queryKey: ['products', authUser.token],
        queryFn: () => productList(authUser.token),
    })

    /**
     * products variable
     */
    const products = ref<ProductType[]>( data.value || [] )

    /**
     * when query data change we set that to the products variable
     */
    watch(data, (newData) => {
        if(newData){
            products.value = newData
        }
    })
</script>