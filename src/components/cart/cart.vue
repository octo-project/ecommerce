<template>
    <Transition name="slide">
        <div v-if="props.open" v-click-away="closeCart" :class="{'invisible': !props.open, 'absolute flex shadow-md flex-col p-5 justify-between bg-white w-sm right-0 h-screen top-0': true}">
            <div>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                </div>
                <div className="flex justify-center" :style="{height: 'calc(100vh - 180px)'}">
                    <div v-if="carts.length == 0" className="flex items-center justify-center flex-col">
                        <img src="@/components/icons/empty.svg" width="80" alt="empty cart" loading="lazy"/>
                        Your cart is empty.
                    </div>
                    <div v-else className="!mt-8 w-full justify-start items-start">
                        <CartItem v-for="cartItem in carts" :key="cartItem.id" :product-id="cartItem.productId" :quantity="cartItem.quantity"/>
                    </div>
                </div>
            </div>
            
            <div>
                <p className="text-2xl font-semibold !mb-4">Total Amount : {{ totalAmount }} $</p>
                <button className="w-full text-white cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-700">Pay with stripe</button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import CartItem from '@/components/cart/cartItem.vue'

    const props = defineProps<{
        open: Boolean,
        toggleCart: () => void
    }>()

    const closeCart = () => {
        props.toggleCart();
    }

    const carts = ref([]);
    const totalAmount = ref<number>(250)

    onMounted(async () => {
        getCartById();
    })

    const getCartById = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/carts/2")
            carts.value = response.data.products;
        } catch (error) {
            console.log("Failed to getCartById");
        }
    }
</script>

<style scoped>
    /* Slide-in animation */
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease-in-out, opacity 0.3s;
    }

    /* Start state (hidden) */
    .slide-enter-from {
        transform: translateX(100%);
        opacity: 0;
    }

    /* End state (visible) */
    .slide-enter-to {
        transform: translateX(0);
        opacity: 1;
    }

    /* Exit animation */
    .slide-leave-from {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }
</style>