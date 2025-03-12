<template>
    <div v-click-away="" :class="{'invisible': !open, 'absolute flex shadow-md flex-col p-5 justify-between bg-white w-sm right-0 h-screen top-0': true}">
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
</template>

<script setup lang="ts">
    import {ref} from 'vue';

    defineProps({
        open: Boolean
    })

    const closeCart = () => {
        console.log("Close cart ...");
    }

    const cart = ref([]);
</script>