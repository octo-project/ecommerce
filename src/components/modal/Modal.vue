<template>
  <div
    id="click-away-modal"
    className="absolute !z-50 flex justify-center items-center top-0 left-0 w-full min-h-screen bg-[#232c2585]"
  >
    <div
      className="bg-white modal-confirmation disabled-close w-[380px] md:w-md  rounded-lg flex justify-between flex-col "
    >
      <div className="disabled-close">
        <div
          className="disabled-close bg-gray-800 flex justify-between items-center text-white p-3 rounded-t-lg"
        >
          <h3 className="disabled-close">{{ props.title }}</h3>
          <img
            @click="props.closeModal"
            id="close-modal-button"
            className="disabled-close cursor-pointer"
            src="@/components/icons/close.svg"
            width="30"
            alt="close"
            loading="lazy"
          />
        </div>
        <div className="disabled-close flex !space-x-2 items-center p-3 !pt-5">
          <img
            :src="`/icons/${props.icon}`"
            width="35"
            className="disabled-close"
            alt="warning"
            loading="lazy"
          />
          <div className="disabled-close">
            <span className="disabled-close">{{ props.actionMessage }}</span>
            <span className="!font-semibold disabled-close line-clamp-2">{{
              props.message
            }}</span>
          </div>
        </div>
      </div>
      <div className="disabled-close p-3 flex justify-end !space-x-2">
        <button
          id="close-modal-button-action"
          @click="props.closeModal"
          className="close-button bg-gray-200 hover:bg-gray-400 px-4 py-1 rounded-lg cursor-pointer"
        >
          Close
        </button>
        <button
          @click="props.validate"
          className="disabled-close bg-blue-500 px-4 py-1 hover:bg-blue-700 rounded-lg text-white cursor-pointer"
        >
          {{ props.okButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  icon?: string;
  message: string;
  validate: () => void;
  actionMessage: string;
  okButtonLabel: string;
  closeModal: () => void;
}>();

const iconPath = ref<string>(`@/components/icons/${props.icon}`);

console.log('iconPath : ', iconPath.value);
</script>
