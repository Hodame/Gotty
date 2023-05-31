<script setup lang="ts">
import { PageableList, GameCardInfo } from '~/global';

const { data: gamePopular } = await useFetch<PageableList<GameCardInfo>>('/api/popular')
</script>	

<template>
	<div class="main my-5">
		<section class="main__popular">
			<div class="main__title text-5xl font-semibold mb-5">Popular</div>

			<Swiper :autoplay="{
				delay: 8000,
				disableOnInteraction: true
			}" :slides-per-view="4" loop :space-between="20" class="main__popular-cards">
				<SwiperSlide v-for="(game, idx) in gamePopular?.results" :key="idx">
					<GameCardsDefault :game-info="game" />
				</SwiperSlide>
			</Swiper>
		</section>
	</div>
</template>