<script setup lang="ts">
import { PageableList, GameCardInfo } from '~/global';

const { data: gamePopular, pending: popularPending } = await useFetch<PageableList<GameCardInfo>>('/api/games/popular')
const { data: gameLatest, pending: latestPending} = await useFetch<PageableList<GameCardInfo>>('/api/games/latest')
</script>	

<template>
	<div class="main my-5">
		<section class="main__popular mb-8">
			<div v-if="!popularPending">
				<div class="main__title text-5xl font-semibold mb-5">Popular</div>

				<Swiper :autoplay="{
					delay: 8000,
					disableOnInteraction: true
				}" :slides-per-view="4" :space-between="20" class="main__popular-cards">
					<SwiperSlide v-for="(game, idx) in gamePopular?.results" :key="idx">
						<CardsGameDefault :game-info="game" />
					</SwiperSlide>
				</Swiper>
			</div>

			<div v-else class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5"/>

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[366px]"/>
				</div>
			</div>
		</section>

		<section class="main__releases mb-8">
			<div v-if="!latestPending">
				<div class="main__title text-5xl font-semibold mb-5">Latest release</div>
	
				<Swiper :autoplay="{
					delay: 8000,
					disableOnInteraction: true
				}" :slides-per-view="4" :space-between="20" class="main__popular-cards">
					<SwiperSlide v-for="(game, idx) in gameLatest?.results" :key="idx">
						<CardsGameDefault :game-info="game" />
					</SwiperSlide>
				</Swiper>
			</div>

			<div v-else class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5"/>

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[366px]"/>
				</div>
			</div>
		</section>
		<section class="main__reviews mb-8">
			<div v-if="!gameLatest">
				<div class="main__title text-5xl font-semibold">Recent reviews</div>

				<Swiper :autoplay="{
					delay: 8000,
					disableOnInteraction: true
				}" :slides-per-view="4" :space-between="20" class="main__popular-cards pt-9">
					<SwiperSlide v-for="(game, idx) in gamePopular?.results" :key="idx" class="pt-10">
						<CardsReviewMain />
					</SwiperSlide>
				</Swiper>
			</div>

			<div v-else class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5"/>

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[366px]"/>
				</div>
			</div>
		</section>
	</div>
</template>