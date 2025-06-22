<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 @click="goToHomePage" className="app-title text-white text-xl cursor-pointer">E-Commerce</h1>
        <div className="navbar-menu flex items-center">
            <span v-if="store.connectedUser.pseudo" className="text-white !mr-5">
                Welcome <span className="!font-bold">{{ store.connectedUser.pseudo }} 👋</span> 
            </span>
            <div className="flex items-center">
                <span id="toggle-cart-button" className="relative text-white cursor-pointer disabled-close !mr-5" @click="toogleCart">
                    <span v-if="productCount>0" className="absolute disabled-close bg-blue-500 w-6 h-6 flex justify-center items-center text-center text-sm rounded-[50%] -top-[10px] -right-[15px]">{{ productCount }}</span>
                    <img 
                        width="25" 
                        alt="cart"
                        loading="lazy"
                        src="@/components/icons/cart.svg" 
                        className="cursor-pointer disabled-close"
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
    import {useRouter} from 'vue-router';
    import { UserType } from '@/types/type';
    import {ref, onMounted, watch} from 'vue';
    import Cart from '@/components/cart/cart.vue';
    import { useQuery } from '@tanstack/vue-query';
    import { useUserStore } from '@/stores/user-store';
    import { getCartById } from '@/services/cartServices';
    import { getUserDetail } from '@/services/userServices';

    const router = useRouter();
    const store = useUserStore();
    const { authUser } = store;
    const showDrawer = ref<boolean>(false);

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

    /**
     * Querying product in panier
     */
    const {data} = useQuery({
        staleTime: 1000 * 60,
        refetchOnMount: true, 
        refetchOnWindowFocus: true,
        enabled: !!authUser.cartId && !! authUser.token,
        queryKey: ['panier', authUser.token],
        queryFn: () => getCartById(authUser.cartId, authUser.token)
    })

    const productCount = ref<number>(data?.value?.Products?.length || 0);

    onMounted(async () => {
        try {
            if(store.authUser.userId)
                getUserDetail(store.authUser.userId, store.authUser.token, (data: UserType) => {
                    store.setConnectedUser(data)
                })
        } catch (error) {
            console.error("Get user detail or Get Cart by id error : ", error);
        }
    })

    watch(data, (newData) => {
        if(newData) {
            productCount.value = newData?.Products?.length || 0
        }
    })
</script>