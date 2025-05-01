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
                    <div v-else className="!mt-8 w-full justify-start overflow-auto items-start">
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
    import './cart.css'
    import axios from 'axios';
    import {ref, watch} from 'vue';
    import { useQuery } from '@tanstack/vue-query';
    import Modal from '@/components/modal/Modal.vue';
    import { useUserStore } from '@/stores/user-store';
    import CartItem from '@/components/cart/cartItem.vue';
    import { getCartById } from '@/services/cartServices';
    import { CartProductType, CartType } from '@/types/type';

    const props = defineProps<{
        open: boolean,
        toggleCart: () => void
    }>()

    const closeCart = () => {
        props.toggleCart();
    }
    
    const {authUser} = useUserStore();
    const modalContent = ref<string>("");
    const productToRemoveId = ref<number|null>(null);
    const openConfirmationModal = ref<boolean>(false);

    const {data} = useQuery({
        staleTime: 1000 * 60,
        refetchOnMount: true, 
        refetchOnWindowFocus: true, 
        enabled: !!authUser.cartId && !! authUser.token,
        queryKey: ['panier', authUser.cartId, authUser.token],
        queryFn: () => getCartById(authUser.cartId, authUser.token)
    })

    const cart = ref<CartType|null>(data?.value || null);
    const totalAmount = ref<number>(data?.value?.amount || 0);
    const cartProducts = ref<CartProductType[]>(data?.value?.Products || []);

    const removeProduct = (productId: number, productName: string) => {
        openConfirmationModal.value = true;
        productToRemoveId.value = productId;
        modalContent.value =  `${productName} ?`;
    }

    const validateRemoveProduct = async () => {
        if(cart && productToRemoveId.value)
            try {
                const data = {cartId: cart.value.id, productId: productToRemoveId.value}
                const response = await axios.delete('http://localhost:5001/remove-product-from-cart', {
                    data,
                    headers: {
                        Authorization: `Bearer ${authUser.token}`
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

    watch(data, (newData) => {
        if(newData) {
            cart.value = newData
            totalAmount.value = newData.amount 
            cartProducts.value = newData.Products
        }
    })
</script>