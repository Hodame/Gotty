<script setup lang="ts">
import { GameInfoAll, PageableList } from '~/global';

defineProps<{
  slides: PageableList<GameInfoAll> | null
}>()
</script>

<template>
  <Swiper :autoplay="{
    delay: 4000,
    disableOnInteraction: true
  }" :slides-per-view="4" :space-between="20" :effect="'coverflow'">
    <SwiperSlide v-for="(game, idx) in slides?.results" :key="idx">
      <NuxtLink :to="{ path: '/game/' + game.id }" class="block h-full">
        <CardsGameDefault :game-info="game" />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>