<template>
    <Transition name="slide">
        <div v-if="props.open" v-click-away="closeCart" :class="{'invisible': !props.open, 'absolute flex shadow-md flex-col p-5 justify-between bg-white w-sm right-0 h-screen top-0': true}">
            <div>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                </div>
                <div className="flex justify-center items-center" :style="{height: 'calc(100vh - 100px)'}">
                    <div v-if="cart.length == 0" className="flex items-center justify-center flex-col">
                        <img src="@/components/icons/empty.svg" width="80" alt="empty cart" loading="lazy"/>
                        Your cart is empty.
                    </div>
                </div>
            </div>
            
            <div>Cart Footer</div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import {ref} from 'vue';

    const props = defineProps<{
        open: Boolean,
        toggleCart: () => void
    }>()

    const closeCart = () => {
        props.toggleCart();
    }

    const cart = ref([]);
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