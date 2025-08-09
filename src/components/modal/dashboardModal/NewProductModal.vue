<template>
    <FormModal v-model="props.isFormModalOpen">
        <div>
            <h2 class="text-xl !font-bold text-orange-400 mb-4">New product</h2>
            <p class="!mb-3">
                Introduce a new product to broaden the catalogue.
            </p> 

            <div class="flex flex-col gap-2">
                <div class="flex border-1 border-dashed justify-center items-center rounded-lg h-[70px]">
                    <label for="file">Choose File</label>
                    <input type="file" id="file" class="text-center hidden">
                </div>
                <div class="flex justify-between gap-2">
                    <div class="flex flex-col flex-1">
                        <label for="label" class="!font-semibold">Label</label>
                        <input type="text" id="label" placeholder="Produit label" class="border-1 border-orange-500 px-3 py-1 rounded-sm">
                    </div>
                    <div class="flex flex-col flex-1">
                        <label for="prix" class="!font-semibold">Prix</label>
                        <input type="text" id="prix" placeholder="Prix" class="border-1 border-orange-500 px-3 py-1 rounded-sm">
                    </div>
                </div>
                <div class="flex flex-col">
                    <label for="category" class="!font-semibold">Category</label>
                    <select name="category" id="category" class="border-1 border-orange-500 px-3 py-1 rounded-sm">
                        <option value="smartphone">Smartphone</option>
                        <option value="automobile">Automobile</option>
                        <option value="informatique">Informatique</option>
                        <option value="electronique">Electronique</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label for="prix" class="!font-semibold">Description</label>
                    <textarea rows="2" type="text" id="prix" placeholder="Product description" class="border-1 border-orange-500 px-3 py-1 rounded-sm"/>
                </div>
            </div>
        </div>
        <div class="flex gap-2 justify-end">
            <button @click="props.updateModalState(false)" class="cursor-pointer mt-4 px-3 py-1 bg-red-400 text-white rounded">
                Fermer
            </button>
            <button @click="props.updateModalState(false)" class="cursor-pointer mt-4 px-3 py-1 bg-orange-500 text-white rounded">
                Sauvegarder
            </button>
        </div>
    </FormModal>
</template>

<script setup lang="ts">
    import FormModal from '@/components/modal/FormModal.vue'

    const props = defineProps<{
        isFormModalOpen: boolean, 
        updateModalState: (value: boolean) => void
    }>()
</script>