<template>
    <nav className="sticky top-0 bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-white text-xl">E-Commerce</h1>
        <div className="flex items-center">
            <span className="text-white !mr-5">
                Welcome <span className="!font-bold">{{ user }} 👋</span> 
            </span>
            <span className="text-white !mr-5">
                <img 
                    width="25" 
                    alt="cart"
                    loading="lazy"
                    @click="toogleCart"
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
        <Cart :open="showDrawer"/>
    </nav>
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {jwtDecode} from 'jwt-decode';
    import {useRouter} from 'vue-router';
    import Cart from '@/components/cart/cart.vue';

    const router = useRouter();
    const user = ref<string>('');
    const showDrawer = ref<Boolean>(false);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    const toogleCart = () => {
        showDrawer.value = !showDrawer.value
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
            const decodedToken = jwtDecode(AuthToken);
            const username = decodedToken.user;
            user.value = username[0]?.toUpperCase() + username?.slice(1);
        } catch (error) {
            console.log("Decode token error : ", error);
        }
        
    })
</script>