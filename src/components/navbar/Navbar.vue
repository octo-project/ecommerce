<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 @click="goToHomePage" className="app-title text-white text-xl cursor-pointer">E-Commerce</h1>
        <div className="navbar-menu flex items-center">
            <span className="text-white !mr-5">
                Welcome <span className="!font-bold">{{ user }} 👋</span> 
            </span>
            <div className="flex items-center">
                <span className="relative text-white !mr-5">
                    <span className="absolute bg-blue-500 w-6 h-6 flex justify-center items-center text-center text-sm rounded-[50%] -top-[10px] -right-[15px]">{{ productCount }}</span>
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
    import {jwtDecode} from 'jwt-decode';
    import {useRouter} from 'vue-router';
    import Cart from '@/components/cart/cart.vue';

    const router = useRouter();
    const user = ref<string>('');
    const productCount = ref<number>(5);
    const showDrawer = ref<boolean>(false);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    const toogleCart = () => {
        showDrawer.value = !showDrawer.value
    }

    const goToHomePage = () => {
        router.push("/");
    }

    onMounted(async () => {
        const AuthToken = localStorage.getItem("token");

        try {
            /**
             * DecodedToken structure
             * sub  : number
             * user : string 
             * iat  : number
             */
            const decodedToken: any = jwtDecode(AuthToken);
            const username = decodedToken.pseudo;
            user.value = username[0]?.toUpperCase() + username?.slice(1);
        } catch (error) {
            console.log("Decode token error : ", error);
        }
        
    })
</script>