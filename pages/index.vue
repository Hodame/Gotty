<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { PageableList, GameInfoAll } from '~/global';

definePageMeta({
	keepalive: true
})

const runtimeConfig = useRuntimeConfig()
const from = useDateFormat(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'YYYY-MM-DD')
const to = useDateFormat(useNow(), 'YYYY-MM-DD')

const { data: gameLatest, pending: latestPending } = await useLazyFetch<PageableList<GameInfoAll>>(() => runtimeConfig.public.baseUrl, {
	params: {
		key: runtimeConfig.public.apiKey,
		ordering: '-released',
		dates: from.value + ',' + to.value,
	}
})

const { data: gamePopular, pending: popularPending } = await useLazyFetch<PageableList<GameInfoAll>>(() => runtimeConfig.public.baseUrl, {
	params: {
		key: runtimeConfig.public.apiKey,
		ordering: '-rating',
		dates: from.value + ',' + to.value,
	},
}) 

useTitle('Main')
</script>	

<template>
	<div>
		<section class="main__popular mb-8">
			<div v-if="!popularPending">
				<div class="main__title text-5xl font-semibold mb-5">Popular</div>

				<CustomSliderDefault :slides="gamePopular"/>
			</div>

			<div v-else class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5" />
				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[320px]" />
				</div>
			</div>
		</section>

		<section class="main__releases mb-8">
			<div v-if="!latestPending">
				<div class="main__title text-5xl font-semibold mb-5">Latest release</div>

				<CustomSliderDefault :slides="gameLatest"/>
			</div>
			<div v-else class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5" />

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[320px]" />
				</div>
			</div>
		</section>

		<!-- <section class="main__reviews mb-8">
			<div>
				<div class="main__title text-5xl font-semibold">Recent reviews</div>

				<CustomSliderReview />
			</div> -->

			<!-- <div class="mb-8">
				<USkeleton class="h-11 w-[250px] mb-5" />

				<div class="flex gap-5">
					<USkeleton v-for="item in 4" class="w-[285px] h-[320px]" />
				</div>
			</div> -->
		<!-- </section> -->
	</div>
</template>