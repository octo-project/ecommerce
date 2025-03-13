<template>
    <div className="flex justify-between items-center">
        <span>Product : {{ props.productId }}</span>
        <span>Quantity : {{ props.quantity }}</span>
        <img @click="removeProduct(props.productId)" className="cursor-pointer" src="@/components/icons/trash.svg" width="40" alt="trash" loading="lazy">
    </div>
</template>

<script setup lang="ts">

    const props = defineProps<{
        quantity: number;
        productId: number; 
        removeProduct: (productId: number) => void;
    }>()

</script>