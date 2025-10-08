<template>
  <div
    class="text-red-100 bg-[#ffffff0a] gap-2 sm:w-full md:w-[510px] p-5 rounded-s-md flex !m-auto justify-center"
  >
    <img
      src="@/components/icons/warning.svg"
      width="80"
      alt="empty cart"
      loading="lazy"
    />
    <div class="gap-2 flex flex-col">
      <p class="font-bold text-3xl text-[#eb0505] flex items-center">
        Data is currently unavailable
      </p>
      <a class="text-white" href="#no-data">Contact support for help !</a>
    </div>
  </div>
</template>
