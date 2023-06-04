<script setup lang="ts">
import { GameCardInfo, PageableList } from '~/global';

defineProps<{
  slides: PageableList<GameCardInfo> | null
}>()
</script>

<template>
  <Swiper :autoplay="{
    delay: 4000,
    disableOnInteraction: true
  }" :slides-per-view="4" :space-between="20" :effect="'coverflow'" style="overflow: visible;">
    <SwiperSlide v-for="(game, idx) in slides?.results" :key="idx">
      <NuxtLink :to="{ path: '/game/' + game.id }">
        <CardsGameDefault :game-info="game" />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>