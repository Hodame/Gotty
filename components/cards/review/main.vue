<script setup lang="ts">
import type { Review } from "@/global";
import { Profile } from "~/types/profiles";

const supabase = useSupabaseClient()
const props = defineProps<{
  review: Review
}>()


const { data: postedBy } = useLazyAsyncData('reviews', async function () {
  const { data } = await supabase.from('profiles').select('*').eq('id', props.review.user_id)
  
  return data as unknown as Profile
})
</script>

<template>
  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-around relative mb-5">
      <img
        class="w-[100px] aspect-3-3 absolute border-2 rounded-lg -top-10 left-0 border-gray-200 object-cover dark:border-gray-700"
        :src="review.background_image" :alt="review.name">
      <div></div>
      <div class="flex flex-col ml-7">
        <span class="font-medium">{{ review.name }}</span>
        <div class="flex items-center mt-1">
          <UIcon name="i-heroicons-star" />
          <span>{{ review.rating }}</span>
        </div>
      </div>
    </div>

    <p class="mb-3 font-normal text-gray-700 overflow-hidden max-h-[192px] dark:text-gray-400"><span
        class="text-ellipsis overflow-hidden line-clamp-6">{{ review.text_review }}</span></p>

    <div class="flex gap-3">
      <UButton label="Read more" class="mr-1"/>

      <div class="flex items-center overflow-hidden">
        <UAvatar :src="postedBy?.avatar_url" :alt="postedBy?.username" class="w-full"/>
        <span class="text-ellipsis overflow-hidden">{{ postedBy?.username }}</span>
      </div>
    </div>

  </div>
</template>