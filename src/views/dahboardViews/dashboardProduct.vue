<template>
  <div class="w-full text-amber-500 p-5 !ml-[200px]">
    <h1 class="text-xl !font-bold">Product Management</h1>
    <div>
      <button
        @click="isFormModalNewProductOpen = true"
        class="cursor-pointer flex flex-row gap-1 items-center hover:text-white"
      >
        <PlusIcon class="size-4" /> New product
      </button>
    </div>
    <div class="!mt-3 overflow-auto pb-[19px]">
      <div v-if="isLoading" className="text-center">Loading ...</div>
      <DashboardTable
        v-else
        :table="productTable"
        :selectProductToUpdate="selectProductToUpdate"
      />
    </div>
  </div>

  <NewProductModal
    :is-form-modal-open="isFormModalNewProductOpen"
    :update-modal-state="updateModalNewProductState"
  />
  <DetailProductModal
    :is-form-modal-open="isFormModalEditProductOpen"
    :update-modal-state="updateModalEditProductState"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useUserStore } from '@/stores/user-store';
import { DashBoardProductType } from '@/types/type';
import { getDashboardProductList } from '@/services/productServices';
import DashboardTable from '@/components/dashboard/table/DashboardTable.vue';
import NewProductModal from '@/components/modal/dashboardModal/NewProductModal.vue';
import {
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import DetailProductModal from '@/components/modal/dashboardModal/EditProductModal.vue';

/**
 * Get connected user data from authUser
 */
const { authUser } = useUserStore();

/**
 * Querying product list
 */
const { data, isLoading, error } = useQuery({
  staleTime: 1000 * 60,
  refetchOnMount: true,
  enabled: !!authUser.token,
  refetchOnWindowFocus: true,
  queryKey: ['products', authUser.token],
  queryFn: () => getDashboardProductList(authUser.token),
});
const products = computed(() => data.value || []);

const isFormModalNewProductOpen = ref(false);
const isFormModalEditProductOpen = ref(false);

const updateModalNewProductState = (value) =>
  (isFormModalNewProductOpen.value = value);
const updateModalEditProductState = (value) =>
  (isFormModalEditProductOpen.value = value);

const selectProductToUpdate = (productId: number) => {
  isFormModalEditProductOpen.value = true;
};

const productData = ref(products);
const columnHelper = createColumnHelper<DashBoardProductType>();

const productTableColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Label',
    cell: (info) => info.getValue(),
    meta: {
      class: 'w-[300px]',
    },
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('image', {
    header: 'Category',
    cell: (info) => 'unkown',
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Prix',
    cell: (info) => `${info.getValue()} Ar`,
    footer: (props) => props.column.id,
  }),
];

const productTable = useVueTable({
  get data() {
    return productData.value;
  },
  columns: productTableColumns,
  getCoreRowModel: getCoreRowModel(),
});
</script>
