<script setup lang="ts">
import { Review } from '~/global';

defineProps<{ 
  review: Review
}>()

</script>

<template>
  <div class="relative aspect-[16/9] h-full overflow-hidden rounded-xl group">
    <img :src="review.background_image" :alt="review.name" class="absolute top-0 left-0 object-cover -z-10 group-hover:blur-sm transition ease duration-500">
    <span v-if="review.rating" class="absolute right-4 top-3 bg-cyan-400 py-2 px-4 rounded-full font-extrabold text-white">{{ review.rating }}</span>
    <div class="w-full p-5 bg-white dark:bg-gray-800  absolute ease -bottom-40 left-0 group-hover:bottom-0 transition-all duration-[400ms]">
      <span class="font-bold text-xl line-clamp-2 break-all pointer-events-auto" :title="review.name">{{ review.name }}</span>
      <div class="flex items-center gap-2">
        <UIcon v-if="review.collection == 'Beaten'" name="i-heroicons-flag"/>
        <UIcon v-if="review.collection == 'Playing'" name="i-heroicons-clock"/>
        <UIcon v-if="review.collection == 'Want'" name="i-heroicons-bookmark"/>
        <div class="font-medium text-base">{{ review.collection }}</div>
      </div>
    </div>
  </div>
</template>