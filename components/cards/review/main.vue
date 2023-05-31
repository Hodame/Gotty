<script setup lang="ts">
import type { Review } from "@/global";

// defineProps<{
//   review: Review
// }>()

</script>

<template>
  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-around relative mb-5">
      <img
        class="w-[100px] aspect-3-3 absolute border-2 rounded-lg -top-10 left-0 border-gray-200 object-cover dark:border-gray-700"
        src="https://gamegpu.com/images/2015/aprel/The-Witcher-3-Wallpaper.jpg" alt="the-witcher-3">
      <div></div>
      <div class="flex flex-col ml-7">
        <span class="font-medium">The witcher 3</span>
        <div class="flex items-center mt-1">
          <UIcon name="i-heroicons-star" />
          <span>10</span>
        </div>
      </div>
    </div>

    <p class="mb-3 font-normal text-gray-700 overflow-hidden max-h-[192px] dark:text-gray-400"><span
        class="text-ellipsis overflow-hidden line-clamp-6">Here are the biggest enterprise technology acquisitions
        of 2021 so far, in reverse chronological order. Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Itaque, tempora? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, excepturi! sit,
        amet consectetur adipisicing elit. Enim fuga dignissimos veritatis sit omnis inventore itaque, ducimus libero
        officiis pariatur!</span></p>

    <div class="flex justify-between">
      <UButton label="Read more" class="mr-1"/>

      <div class="flex items-center overflow-hidden">
        <UAvatar src="https://gamegpu.com/images/2015/aprel/The-Witcher-3-Wallpaper.jpg" alt="user" class="w-full"/>
        <span class="text-ellipsis overflow-hidden">Hodafsdfsdfsdfsdfsddsfdsfsdfme</span>
      </div>
    </div>

  </div>
</template>