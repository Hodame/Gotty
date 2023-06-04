<script setup lang="ts">
import { GameCardInfo, PageableList } from '~/global';

defineProps<{
  slides?: PageableList<GameCardInfo> | null
}>()
</script>

<template>
  <Swiper :autoplay="{
    delay: 8000,
    disableOnInteraction: true
  }" :slides-per-view="4" :space-between="20" class="main__popular-cards pt-9">
    <SwiperSlide v-for="(review, idx) in 4" :key="idx" class="pt-10">
      <CardsReviewMain />
    </SwiperSlide>
  </Swiper>
</template>