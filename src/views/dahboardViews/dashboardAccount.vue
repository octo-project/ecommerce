<template>
    <div class="w-full text-amber-500 p-5 !ml-[200px]">
        <h1 class="text-xl !font-bold">Account Management</h1>
        <div class="!mt-3">
           <DashboardTable :table="accountTable"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useUserStore } from '@/stores/user-store';
    import { getDashboardUserList } from "@/services/userServices";
    import { DashboardAccountType } from '@/types/dashboardAccountType';
    import DashboardTable from '@/components/dashboard/table/DashboardTable.vue'
    import { createColumnHelper, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

    const store = useUserStore();

    onMounted(async () => {
        try {
            if(store.authUser.userId){
                console.log("Get dashboard user list : ", store.authUser.token);
            }
            console.log('store : ', store.authUser.userId);
        } catch (error) {
            console.error("Undefined store", error);
        }
    })

    const Accounts: DashboardAccountType[]= [
        {id:1, active: true, email: 'lolo@gmail.com', pseudo:'Koto'},
        {id:2, active: true, email: 'jeanLove@gmail.com', pseudo:'Jean'},
        {id:3, active: false, email: 'rakoto@gmail.com', pseudo:'Tiger'},
        {id:4, active: true, email: 'kely@gmail.com', pseudo:'Kely'},
        {id:5, active: false, email: 'lalaina@gmail.com', pseudo:'lala'}
    ]
    const data = ref(Accounts)
    const columnHelper = createColumnHelper<DashboardAccountType>()

    const accountTableColumns = [
        columnHelper.accessor('id', {
            header: "Id",
            cell: info => info.getValue(),
            footer: props => props.column.id,
        }),
        columnHelper.accessor('pseudo', {
            header: "Pseudo",
            cell: info => info.getValue(),
            footer: props => props.column.id,
        }),
        columnHelper.accessor('email', {
            header: "Email",
            cell: info => info.getValue(),
            footer: props => props.column.id,
        }),
        columnHelper.accessor('active', {
            header: "En ligne",
            cell: info => `${info.getValue() === true ? 'Connected' : 'Disconnected'}`,
            footer: props => props.column.id,
        }),
    ]

    const accountTable = useVueTable({
        get data() {return data.value},
        columns: accountTableColumns,
        getCoreRowModel: getCoreRowModel()
    })

</script>