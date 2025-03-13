<template>
    <div :class="{'bg-red-600': props.type === 'error', 'bg-green-600': props.type === 'succes', 'absolute -z-1 rounded-lg text-white text-lg flex justify-center items-center bottom-5 w-[50%] left-1/2 -translate-x-1/2 transform:tr h-[35px]': true}">
        <img v-if="props.type === 'succes'" src="@/components/icons/success.svg" alt="success" loading="lazy" className="absolute left-3">
        <img v-if="props.type === 'error'" width="20" src="@/components/icons/error.svg" alt="error" loading="lazy" className="absolute left-3">
        <span>
            {{ props.message }}
        </span>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        message: string,
        type: "succes" | "error",
    }>()

    const ErrorClassName = "bg-red-600";
    const SuccessClassName = "bg-green-600";
</script>