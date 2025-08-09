<template>
    <div class="w-full text-amber-500 p-5">
        <h1 class="text-xl !font-bold">Product Management</h1>
        <div class="!mt-3">
           <DashboardTable :table="productTable"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { DashBoardProductType } from '@/types/dashboardProductType';
    import DashboardTable from '@/components/dashboard/table/DashboardTable.vue'
    import { createColumnHelper, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

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