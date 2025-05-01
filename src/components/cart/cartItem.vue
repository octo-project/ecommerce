<template>
    <div className="flex justify-between items-center">
        <div className="flex items-center">
            <img :src="props.product.image" width="80" alt="product" loading="lazy">
            <span className="line-clamp-1 w-[160px]">{{ props.product.name }}</span>
        </div>
        <span className="font-bold">{{ props.quantity }}</span>
        <img @click="removeProduct(props.productId, props.product.name)" className="cursor-pointer" src="@/components/icons/trash.svg" width="40" alt="trash" loading="lazy">
    </div>
</template>

<script setup lang="ts">
    import { CartProductItemType } from '@/types/type';

    const props = defineProps<{
        quantity: number;
        productId: number;
        product: CartProductItemType; 
        removeProduct: (productId: number, productName: string) => void;
    }>()

</script>