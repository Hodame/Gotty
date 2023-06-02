<script setup lang="ts">
import { PageableList, GameCardInfo } from '~/global';

const runtimeConfig = useRuntimeConfig()

const gamePopular = useGamesPopular()
const gameLatest = useGamesLatest()

onMounted(async function () {
	const from = useDateFormat(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'YYYY-MM-DD')
	const to = useDateFormat(useNow(), 'YYYY-MM-DD')
	const { data: latest, pending: latestPending } = await useFetch<PageableList<GameCardInfo>>('/api/games/latest')

	console.log(runtimeConfig);
	
	const response = await $fetch<PageableList<GameCardInfo>>(runtimeConfig.baseUrl, {
		method: 'GET',
		params: {
			key: runtimeConfig.apiKey,
			ordering: 'rating',
			dates: from.value + ',' + to.value,
		}
	})
	console.log(response);
	
	if (latest.value != null) {
		gameLatest.value = latest.value
		// gamePopular.value = popular.value
	}

})
</script>	

<template>
	<div class="main my-5">
		<section class="main__popular mb-8">
			<div>
				<div class="main__title text-5xl font-semibold mb-5">Popular</div>

				<Swiper :autoplay="{
					delay: 8000,
					disableOnInteraction: true
				}" :slides-per-view="4" :space-between="20" class="main__popular-cards">
					<SwiperSlide v-for="(game, idx) in gamePopular.results" :key="idx">
						<CardsGameDefault :game-info="game" />
					</SwiperSlide>
				</Swiper>
			</div>

			<div class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5" />

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[366px]" />
				</div>
			</div>
		</section>

		<section class="main__releases mb-8">
			<div>
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

			<div class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5" />

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[366px]" />
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
				<USkeleton class="h-11 w-[250px] mb-5" />

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[366px]" />
				</div>
			</div>
		</section>
	</div>
	<div>
		main
	</div>
</template>