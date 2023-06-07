<script setup lang="ts">
import { Review } from '~/global';
const route = useRoute()
const supabase = useSupabaseClient()

const gameId = ref(Number(route.params.id))


const { data: reviews } = useLazyAsyncData('reviews', async function () {
  const { data } = await supabase.from('games_review').select('*').eq('game_id', gameId.value).gt('text_review', 0) 
  
  return data as Review[]
})

</script>

<template>
  <div v-if="reviews?.length">
    <h1 class="title">Reviews</h1>

    <Swiper :autoplay="{
      delay: 8000,
      disableOnInteraction: true
    }" :slides-per-view="4" :space-between="20" class="main__popular-cards">
      <SwiperSlide v-for="(review, idx) in reviews" :key="idx">
        <CardsReviewGamePage :review="review" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>