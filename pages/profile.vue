<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { getDocs } from 'firebase/firestore';

definePageMeta({
	middleware: 'auth'
})

const user = useCurrentUser()!
const db = useFirestore()

const infoCard = ref(['Games', 'Playing', 'Want', 'Beaten'])
const gamesCount = ref([0, 0, 0, 0])
const discord = ref('hodame4523')
const isLoading = ref(true)
const isUpdateModal = ref(false)

const { copy, text, copied } = useClipboard({ source: discord })

const beaten = await getDocs(userCollection(db, user.value!.uid, 'Beaten'))
const want = await getDocs(userCollection(db, user.value!.uid, 'Want'))
const playing = await getDocs(userCollection(db, user.value!.uid, 'Playing'))


onNuxtReady(() => {
	isLoading.value = false
})

gamesCount.value = [beaten.docs.length + want.docs.length + playing.docs.length, playing.docs.length, beaten.docs.length, want.docs.length]

useTitle(user.value?.displayName)
</script>

<template>
	<div v-if="!isLoading && user" class="h-full">
		<div class="grid grid-cols-[1fr,1.5fr] items-center">
			<div class="flex gap-3">
				<UAvatar size="xl" :src="user.photoURL ? user.photoURL : ''"
					:alt="user.displayName ? user.displayName : 'User'" />
				<div>
					<p class="text-2xl font-semibold">{{ user?.displayName }}
						<UButton @click="isUpdateModal = true" icon="i-fluent-settings-24-regular" variant="outline" size="xs" />
						<ModalsProfilesSettings v-model:is-modal="isUpdateModal" />
					</p>
					<div class="flex">
						<div class="relative">
							<UTooltip :text="discord">
								<UButton @click="copy(discord)" size="xs" color="white" variant="ghost" icon="i-bi-discord" />
								<span v-if="copied"
									class="absolute top-0 -left-[50%] border border-color text-xs color-primary z-50 rounded-lg font-semibold p-1 bg-white dark:bg-cool-900">Copied</span>
							</UTooltip>
						</div>
						<UButton size="xs" color="white" variant="ghost" icon="i-bi-steam" />
					</div>
				</div>
			</div>

			<div class="grid grid-cols-4 rounded-xl">
				<div v-for="(card, idx) in infoCard" :key="idx" class="p-2 w-full border-r border-color last:border-none">
					<h1 class="text-lg font-semibold text-center">{{ card }}</h1>
					<p class="text-xl font-medium text-center">{{ gamesCount[idx] }}</p>
				</div>
			</div>
		</div>

		<div v-if="!playing.empty && !playing.empty && !playing.empty">
			<div v-if="!playing.empty" class="my-6">
				<h1 class="text-5xl font-semibold">Playing</h1>

				<div>
					<Swiper :autoplay="{
						delay: 4000,
						disableOnInteraction: true
					}" :slides-per-view="3" :space-between="20" :effect="'coverflow'">
						<SwiperSlide v-for="(game, idx) in playing.docs" :key="idx" style="padding-top: 25px;">
							<NuxtLink :to="'/game/' + game.data().game_id">
								<CardsReviewProfile :review="game.data()" />
							</NuxtLink>
						</SwiperSlide>
					</Swiper>

				</div>
			</div>

			<div v-if="!beaten.empty" class="my-6">
				<h1 class="text-5xl font-semibold">Beaten</h1>

				<div>
					<Swiper :autoplay="{
						delay: 4000,
						disableOnInteraction: true
					}" :slides-per-view="3" :space-between="20" :effect="'coverflow'">
						<SwiperSlide v-for="(game, idx) in beaten.docs" :key="idx" style="padding-top: 25px;">
							<NuxtLink :to="'/game/' + game.data().game_id">
								<CardsReviewProfile :review="game.data()" />
							</NuxtLink>
						</SwiperSlide>
					</Swiper>

				</div>
			</div>

			<div v-if="!want.empty" class="my-6">
				<h1 class="text-5xl font-semibold">Want</h1>

				<div>
					<Swiper :autoplay="{
						delay: 4000,
						disableOnInteraction: true
					}" :slides-per-view="3" :space-between="20" :effect="'coverflow'">
						<SwiperSlide v-for="(game, idx) in want.docs" :key="idx" style="padding-top: 25px;">
							<NuxtLink :to="'/game/' + game.data().game_id">
								<CardsReviewProfile :review="game.data()" />
							</NuxtLink>
						</SwiperSlide>
					</Swiper>

				</div>
			</div>
		</div>
		<div v-else class="h-full flex items-center justify-center">
			<h1 class="text-3xl font-medium pb-32">You dont have any games in your collection! 🤷‍♂️</h1>
		</div>
	</div>

	<SkeletonsProfile v-else />
</template>