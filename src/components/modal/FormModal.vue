<template>
    <transition name="fade">
        <div 
            v-if="props.modelValue" 
            class="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50"
        >
            <div class="bg-white flex flex-col justify-between rounded min-h-[83%] shadow-lg max-w-lg w-full p-6 relative">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
   const props = defineProps({
    modelValue: {type: Boolean, required: true}
   })
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.25s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>