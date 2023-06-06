<script setup lang="ts">
import { Review } from '~/global';

const supabase = useSupabaseClient()

const reviews = ref<Review[] | null>(null)

const props = defineProps<{
  id: number | undefined
}>()

onMounted(async function () {
  try {
    const { data } = await supabase.from('games_review').select('*').eq('game_id', props.id)

    if(data) reviews.value = data
  } catch (error) {
    throw error
  }
})
</script>

<template>
  <div>
    <CustomSliderReview :slides="reviews"/>
  </div>
</template>