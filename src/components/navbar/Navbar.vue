<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 @click="goToHomePage" className="app-title text-white text-xl cursor-pointer">E-Commerce</h1>
        <div className="navbar-menu flex items-center">
            <span v-if="store.connectedUser.pseudo" className="text-white !mr-5">
                Welcome <span className="!font-bold">{{ store.connectedUser.pseudo }} 👋</span> 
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
    import {ref, onMounted} from 'vue';
    import {useRouter} from 'vue-router';
    import Cart from '@/components/cart/cart.vue';
    import { CartType, UserType } from '@/types/type';
    import { useUserStore } from '@/stores/user-store';
    import { getCartById } from '@/services/cartServices';
    import { getUserDetail } from '@/services/userServices';

    const router = useRouter();
    const productCount = ref<number>(0);
    const showDrawer = ref<boolean>(false);
    const store = useUserStore();

    const logout = () => {
        store.clearAuthUser();
        router.push("/login");
    }

    const toogleCart = () => {
        showDrawer.value = !showDrawer.value
    }

    const goToHomePage = () => {
        router.push("/");
    }

    onMounted(async () => {
        try {
            if(store.authUser.userId)
                getUserDetail(store.authUser.userId, store.authUser.token, (data: UserType) => {
                    store.setConnectedUser(data)
                })
            if(store.authUser.cartId)
                getCartById(store.authUser.cartId, store.authUser.token, (data: CartType) => {
                    productCount.value = data.Products.length;
                });
        } catch (error) {
            console.error("Get user detail or Get Cart by id error : ", error);
        }
        
    })
</script>