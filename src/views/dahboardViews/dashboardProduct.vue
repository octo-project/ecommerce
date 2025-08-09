<template>
    <div class="w-full text-amber-500 p-5">
        <h1 class="text-xl !font-bold">Product Management</h1>
        <div>
            <button @click="isFormModalNewProductOpen = true" class="cursor-pointer flex flex-row gap-1 items-center hover:text-white"><PlusIcon class="size-4"/> New product</button>
        </div>
        <div class="!mt-3">
           <DashboardTable :table="productTable" :selectProductToUpdate="selectProductToUpdate"/>
        </div>
    </div>

    <NewProductModal :is-form-modal-open="isFormModalNewProductOpen" :update-modal-state="updateModalNewProductState"/>
    <DetailProductModal :is-form-modal-open="isFormModalEditProductOpen" :update-modal-state="updateModalEditProductState"/>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { PlusIcon } from '@heroicons/vue/24/solid'
    import { DashBoardProductType } from '@/types/dashboardProductType'
    import DashboardTable from '@/components/dashboard/table/DashboardTable.vue'
    import NewProductModal from '@/components/modal/dashboardModal/NewProductModal.vue'
    import { createColumnHelper, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
    import DetailProductModal from '@/components/modal/dashboardModal/EditProductModal.vue'

    const isFormModalNewProductOpen = ref(false)
    const isFormModalEditProductOpen = ref(false)

    const updateModalNewProductState = (value) => isFormModalNewProductOpen.value = value
    const updateModalEditProductState = (value) => isFormModalEditProductOpen.value = value

    const selectProductToUpdate = (productId: number) => {
        isFormModalEditProductOpen.value = true
        console.log("product id : ", productId)
    }

    const Products: DashBoardProductType[] = [
        {id:1, label: "Yamaha C4", category: "Scooter", subCategory: "Moto", price: 6000000},
        {id:2, label: "PS5", category: "Consoles de jeux", subCategory: "PlayStation", price: 4000000},
        {id:3, label: "XBOX", category: "Consoles de jeux", subCategory: "Xbox Series", price: 3000000},
        {id:4, label: "Google Pixel 9", category: "Smartphones", subCategory: "Android", price: 4000000},
        {id:5, label: "iPhone 16", category: "Smartphones", subCategory: "Apple iPhone", price: 5000000},
    ]

    const data = ref(Products)
    const columnHelper = createColumnHelper<DashBoardProductType>()

    const productTableColumns = [
        columnHelper.accessor('id', {
            header: "Id",
            cell: info => info.getValue(),
            footer: props => props.column.id,
        }),
        columnHelper.accessor('label', {
            header: "Produit",
            cell: info => info.getValue(),
            footer: props => props.column.id,
        }),
        columnHelper.accessor('category', {
            header: "Category",
            cell: info => info.getValue(),
            footer: props => props.column.id,
        }),
        columnHelper.accessor('price', {
            header: "Prix",
            cell: info => `${info.getValue()} Ar`,
            footer: props => props.column.id,
        })
    ]

    const productTable = useVueTable({
        get data() {return data.value},
        columns: productTableColumns,
        getCoreRowModel: getCoreRowModel(),
    })

</script>