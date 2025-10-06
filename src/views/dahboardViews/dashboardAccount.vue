<template>
    <div class="w-full text-amber-500 p-5 !ml-[200px]">
        <h1 class="text-xl !font-bold">Account Management</h1>
        <div class="!mt-3">
           <DashboardTable :table="accountTable" :selectProductToUpdate="showUserDetail"/>
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
    let Accounts: DashboardAccountType[] = []
    const dataList = ref(Accounts)

    onMounted(async () => {
        try {
            if(store.authUser.userId){
                getDashboardUserList(store.authUser.token, (data) => {
                    dataList.value = (data?.users||[]).map(user => ({
                        "id": user.id, "active": false, "email": user.email, "pseudo": user.pseudo
                    }))
                })
            }
        } catch (error) {
            console.error("Undefined store", error);
        }
    })

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

    const showUserDetail = (userId: number) => {
        console.log("user id : ", userId)
    }

    const accountTable = useVueTable({
        get data() {return dataList.value},
        columns: accountTableColumns,
        getCoreRowModel: getCoreRowModel()
    })

</script>