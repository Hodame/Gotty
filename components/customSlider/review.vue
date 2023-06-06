<script setup lang="ts">
import { Review } from '~/global';

defineProps<{
  slides: Review[] | null
}>()
</script>

<template>
  <Swiper :autoplay="{
    delay: 8000,
    disableOnInteraction: true
  }" :slides-per-view="4" :space-between="20" class="main__popular-cards pt-9">
    <SwiperSlide v-for="(review, idx) in slides" :key="idx" class="pt-10">
      <CardsReviewMain :review="review"/>
    </SwiperSlide>
  </Swiper>
</template>