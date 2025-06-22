<template>
    <div class="w-full min-h-screen">
        <NavBar/>
        <div v-if="loading" className="text-center">Loading ...</div>
        <div v-else-if="error" className="text-red-500">{{ error }}</div>
        <div v-else className="product-detail-container gap-[20px] flex flex-col lg:flex-row p-5 items-center" :style="{ height: 'calc(100vh - 80px)' }">
            <img :src="product.image" :alt="product.name" className="h-64 object-scale-down rounded" loading="lazy"/>
            <div className="ml-0 !md:ml-5 pb-[15px] md:pb-0">
                <h1 className="text-2xl !font-semibold mt-4">{{ product.name }}</h1>
                <p className="product-description text-gray-600 !mt-2 text-justify">{{ product.description }}</p>
                <p className="text-xl font-semibold !my-4">
                    Price : 
                    <span className="text-gray-600 !font-black text-lg">{{ product.price }} $</span>
                </p>
                <div>
                    <button @click="goBack" className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 !mr-4">Back</button>
                    <button @click="addToCart" className="mt-4 cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
                </div>
            </div>
        </div>
        <SnackBar v-if="snackBarState != null" :type="snackBarState" :message="snackBarMessage"/>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import {ref, onMounted, computed} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import { useUserStore } from '@/stores/user-store';
    import NavBar from '@/components/navbar/Navbar.vue';
    import { getCartById } from '@/services/cartServices';
    import SnackBar from '@/components/snackbar/Snackbar.vue';
    import { useQuery, useQueryClient } from '@tanstack/vue-query';

    interface ProductDetail {
        id: number; 
        name: string; 
        price: number; 
        image: string;
        description: string; 
    }

    const route = useRoute();
    const router = useRouter();
    const loading = ref<boolean>(true);
    const queryClient = useQueryClient()
    const error = ref<string | null>(null);
    const product = ref<ProductDetail | null>(null);
    const snackBarState=ref<'succes'|'error'|null>(null);
    const snackBarMessage=ref<string>("");
    const {authUser, setCartId} = useUserStore();
    const userId = ref<number>(authUser.userId);
    const cartId = ref<number>(authUser.cartId);

    /**
     * Querying product in panier
     */
    const { refetch } = useQuery({
        staleTime: 1000 * 60,
        queryKey: computed(() => ['panier', authUser.token]),
        queryFn: () => getCartById(cartId.value, authUser.token),
        enabled: computed(() => !!cartId.value && !! authUser.token),
    })
    
    onMounted( async () => {
        try {
            const response = await axios.get(`http://localhost:5001/product-detail/${route.params.id}`, {
                headers:{
                    Authorization: `Bearer ${authUser.token}`
                }
            })
            product.value = response.data.data
        } catch (error) {
            error.value = "Failed to load product details";   
        } finally {
            loading.value = false;
        }
    })

    const goBack = () => {
        router.back();
    }

    const addToCart = async () => {
        const cart = {userId: userId.value, quantity: 1,  productId: product.value.id, cartId: authUser.cartId};

        try {
            const response = await axios.post('http://localhost:5001/add-product-to-cart', cart, {
                headers: {
                    Authorization: `Bearer ${authUser.token}`
                }
            })
            if(response.status == 200){
                snackBarState.value = 'succes';
                snackBarMessage.value = 'Product added to cart.';

                if(authUser.cartId){
                    /**
                     * Invalidate queryKey : panier
                     */
                    try {
                        await queryClient.invalidateQueries({queryKey: ['panier', authUser.token]})
                    } catch (error) {
                        console.error("invalidate cache error : ", error)
                    }
                }else {
                    /**
                     * Get cart id from request response and update store
                     * */ 
                    cartId.value = response.data?.data?.id
                    
                    if(response.data?.data?.id) {
                        // call store update 
                        setCartId(response.data?.data?.id)
                        const res = await refetch()
                    }
                }
                
            }else{
                snackBarState.value = 'error';
                snackBarMessage.value = 'Failed to add product to cart.';
            }
        } catch (error){
            snackBarState.value = 'error'
            snackBarMessage.value = 'Failed to add product to cart.'
        }
    }
    
</script>