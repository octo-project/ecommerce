<template>
    <Transition name="slide">
        <div v-if="props.open" v-click-away="closeCart" :class="{'invisible': !props.open, 'cart-container absolute z-40 flex shadow-md flex-col p-5 justify-between bg-white w-sm right-0 h-screen top-0': true}">
            <div>
                <div className="cart-heading">
                    <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                    <img @click="closeCart" className="cart-close-img" src="@/components/icons/close-black.svg" width="35" fill="red" alt="close">
                </div>
                <div className="flex justify-center" :style="{height: 'calc(100vh - 180px)'}">
                    <div v-if="cartProducts.length == 0" className="flex items-center justify-center flex-col">
                        <img src="@/components/icons/empty.svg" width="80" alt="empty cart" loading="lazy"/>
                        Your cart is empty.
                    </div>
                    <div v-else className="!mt-8 w-full justify-start items-start">
                        <CartItem v-for="cartItem in cartProducts" :key="cartItem.id" :product-id="cartItem.productId" :quantity="cartItem.quantity" :product="cartItem.Product" :removeProduct="removeProduct"/>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-2xl font-semibold !mb-4">Total Amount : {{ totalAmount }} $</p>
                <button className="w-full text-white cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-700">Pay with stripe</button>
            </div>
        </div>
    </Transition>
    <Modal v-if="openConfirmationModal" :validate="validateRemoveProduct" :close-modal="closeModal" :message="modalContent" :action-message="'Are you sure to remove : '" :title="'Remove product'" :ok-button-label="'Remove'"/>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import {ref, onMounted} from 'vue';
    import { jwtDecode } from 'jwt-decode';
    import Modal from '@/components/modal/Modal.vue';
    import CartItem from '@/components/cart/cartItem.vue';
    import { CartProductType, CartType, DecodedTokenType } from '@/types/type';

    const props = defineProps<{
        open: boolean,
        toggleCart: () => void
    }>()

    const closeCart = () => {
        props.toggleCart();
    }
    
    const totalAmount = ref<number>(0);
    const modalContent = ref<string>("");
    const cart = ref<CartType|null>(null);
    const token = localStorage.getItem("token");
    const cartProducts = ref<CartProductType[]>([]);
    const productToRemoveId = ref<number|null>(null);
    const openConfirmationModal = ref<boolean>(false);

    onMounted(async () => {
        const decodedToken: DecodedTokenType = jwtDecode(token);

        if(decodedToken.cartId)
            getCartById(decodedToken.cartId, token);
    })

    const removeProduct = (productId: number, productName: string) => {
        openConfirmationModal.value = true;
        productToRemoveId.value = productId;
        modalContent.value =  `${productName} ?`;
    }

    const validateRemoveProduct = async () => {
        console.log("product to remove : ", productToRemoveId.value);

        if(cart && productToRemoveId.value)
            try {
                const data = {cartId: cart.value.id, productId: productToRemoveId.value}
                const response = await axios.delete('http://localhost:5001/remove-product-from-cart', {
                    data,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status == 200){
                    closeModal();
                }
                console.log("response : ", response);
            } catch (error) {
                console.log("Failed to remove product from cart");
            }
    }
    
    const closeModal = () => {
        openConfirmationModal.value = false;
    }

    const getCartById = async (cartId: number, token: string) => {
        try {
            const response = await axios.get(`http://localhost:5001/cart/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const cartData: CartType = response.data.data
            cart.value = cartData;
            totalAmount.value = cartData.amount;
            cartProducts.value = cartData.Products;
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