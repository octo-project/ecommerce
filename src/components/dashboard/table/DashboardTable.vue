<template>
    <table class="w-full">
        <thead class="rounded-lg">
            <tr class="bg-white rounded-xs h-[35px]" v-for="hg in props.table.getHeaderGroups()" :key="hg.id">
                <th class="!font-semibold" v-for="header in hg.headers" :key="header.id">
                    <FlexRender :render="header.column.columnDef.header" :props="header.getContext()"/>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr @click="selectProductToUpdate(+(row.original as any).id)" v-for="(row, rowIndex) in props.table.getRowModel().rows" :key="row.id" :class="rowIndex % 2 === 0 ? 'bg-amber-200' : 'bg-amber-50'">
                <td class="text-center cursor-pointer h-[30px] text-black" v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts" generic="TData">
    import {FlexRender} from '@tanstack/vue-table';
    import type { Table } from '@tanstack/vue-table';

    const props = defineProps<{
        table: Table<TData>,
        selectProductToUpdate?: (productId: number) => void
    }>()
</script>