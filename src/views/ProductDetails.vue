<template>
    <div class="w-full min-h-screen relative">
        <NavBar/>
        <div v-if="loading" className="text-center">Loading ...</div>
        <div v-else-if="error" className="text-red-500">{{ error }}</div>
        <div v-else className="product-detail-container flex p-5 items-center" :style="{ height: 'calc(100vh - 80px)' }">
            <img :src="product.image" :alt="product.title" className="h-64 object-scale-down rounded" loading="lazy"/>
            <div className="!ml-5">
                <h1 className="text-2xl font-bold mt-4">{{ product.title }}</h1>
                <p className="product-description text-gray-600 !mt-2">{{ product.description }}</p>
                <p className="text-xl font-semibold !my-4">
                    Price : 
                    <span className="!font-bold">{{ product.price }} $</span>
                </p>
                <div>
                    <button @click="goBack" className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 !mr-4">Back</button>
                    <button @click="addToCart" className="mt-4 cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
                </div>
            </div>
        </div>
        <SnackBar :type="'succes'" :message="'Operation failed'"/>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import {jwtDecode} from 'jwt-decode';
    import {useRoute, useRouter} from 'vue-router';
    import NavBar from '@/components/navbar/Navbar.vue';
    import SnackBar from '@/components/snackbar/Snackbar.vue';

    interface ProductDetail {
        id: number; 
        title: string; 
        price: number; 
        image: string;
        description: string; 
    }

    const route = useRoute();
    const router = useRouter();
    const loading = ref<boolean>(true);
    const userId = ref<string|null>(null);
    const error = ref<string | null>(null);
    const product = ref<ProductDetail | null>(null);
    
    onMounted( async () => {
        getUserIdFromAuthToken();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5001/product-detail/${route.params.id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            product.value = response.data.data
        } catch (error) {
            error.value = "Failed to load product details";   
        } finally {
            loading.value = false;
        }
    })

    const getUserIdFromAuthToken = () => {
        const AuthToken = localStorage.getItem("token");
        try {
            const decodedToken = jwtDecode(AuthToken);
            userId.value = decodedToken.sub
        } catch (error) {
            console.log("Decode token error : ", error);
        }
    }

    const goBack = () => {
        router.back();
    }

    const addToCart = async () => {
        const cart = {userId: userId.value, products: [{id: product.value.id}]};

        try {
            const response = axios.post('https://fakestoreapi.com/carts', cart)
        } catch (error){
            console.log("Failed to add product to cart ... ");
        }
    }
    
</script>