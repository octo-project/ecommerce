<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 @click="goToHomePage" className="app-title text-white text-xl cursor-pointer">E-Commerce</h1>
        <div className="navbar-menu flex items-center">
            <span className="text-white !mr-5">
                Welcome <span className="!font-bold">{{ user }} 👋</span> 
            </span>
            <div className="flex items-center">
                <span className="relative text-white !mr-5">
                    <span v-if="productCount>0" className="absolute bg-blue-500 w-6 h-6 flex justify-center items-center text-center text-sm rounded-[50%] -top-[10px] -right-[15px]">{{ productCount }}</span>
                    <img 
                        width="25" 
                        alt="cart"
                        loading="lazy"
                        @click="toogleCart"
                        id="toggle-cart-button"
                        className="cursor-pointer"
                        src="@/components/icons/cart.svg" 
                    >
                </span>
                <img 
                    width="35"
                    loading="lazy"
                    @click="logout"
                    className="cursor-pointer"
                    src="@/components/icons/logout.svg"
                />
            </div>
        </div>
        <Cart :open="showDrawer" :toggleCart="toogleCart"/>
    </nav>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import {jwtDecode} from 'jwt-decode';
    import {useRouter} from 'vue-router';
    import Cart from '@/components/cart/cart.vue';
    import { useUserStore } from '@/stores/user-store';
    import { CartType, DecodedTokenType } from '@/types/type';

    const router = useRouter();
    const user = ref<string>('');
    const {authUser} = useUserStore();
    const productCount = ref<number>(0);
    const showDrawer = ref<boolean>(false);
    const {clearAuthUser} = useUserStore();

    const logout = () => {
        clearAuthUser();
        router.push("/login");
    }

    const toogleCart = () => {
        showDrawer.value = !showDrawer.value
    }

    const goToHomePage = () => {
        router.push("/");
    }

    const getCartById = async (cartId: number, token: string) => {
        try {
            const response = await axios.get(`http://localhost:5001/cart/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const cart: CartType = response.data.data
            productCount.value = cart.Products.length;
        } catch (error) {
            console.log("Failed to getCartById");
        }
    }

    onMounted(async () => {
        try {
            user.value = authUser.pseudo[0]?.toUpperCase() + authUser.pseudo?.slice(1);

            if(authUser.cartId)
                getCartById(authUser.cartId, authUser.token);
        } catch (error) {
            console.log("Decode token error : ", error);
        }
        
    })
</script>