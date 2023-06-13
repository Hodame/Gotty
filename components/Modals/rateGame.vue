<script setup lang="ts">
import { update } from 'firebase/database';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Review } from '~/global';

const db = useFirestore()
const user = useCurrentUser()

const props = defineProps<{
	isModal: boolean
	game: {
		name: string
		id: number
		background_image: string
	},
	userReview?: Review
}
>()
const emits = defineEmits<{
	(e: 'update:isModal', v: boolean): void
	(e: 'IsLoginModal'): void
}>()

const isRateModal = ref(false)
const isLoading = ref(false)

const selected = ref<'want' | 'playing' | 'beaten' | ''>(props.userReview?.collection ? props.userReview?.collection : '')
const selectedRate = ref(props.userReview?.rating ? props.userReview?.rating : '')
const rateScale = ref(['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
const textReview = ref(props.userReview?.text_review ? props.userReview?.text_review : '')

const value = computed({
	get() {
		return props.isModal
	},
	set(value: boolean) {
		emits('update:isModal', value)
	}
})

async function addGameReview() {
	try {
		isLoading.value = true
		if (!user.value) throw new Error()
		await addDoc(collection(db, 'games', props.game.id.toString(), 'reviews'), {
			game_id: props.game.id,
			name: props.game.name,
			background_image: props.game.background_image,
			text_review: textReview.value,
			rating: selectedRate.value,
			collection: selected.value,
			user: {
				user_id: user.value.uid,
				nickname: user.value.displayName,
				avatar: user.value.photoURL
			}
		}).then(async (data) => {		
			if (!user.value) throw new Error()				
			await updateDoc(doc(db, 'games', props.game.id.toString(), 'reviews', data.id), {
				doc_id: data.id
			})

			await setDoc(doc(db, 'profiles', user.value.uid, 'games_reviews', props.game.id.toString()), {
			game_id: props.game.id,
			name: props.game.name,
			background_image: props.game.background_image,
			text_review: textReview.value,
			rating: selectedRate.value,
			collection: selected.value,
			doc_id: data.id,
		})
		})

		isLoading.value = false
		emits('update:isModal', false)
		isRateModal.value = false
	} catch (error) {
		throw error
	}
}

async function editGameReview() {
	try {
		isLoading.value = true

		if (user.value !== null && user.value !== undefined && props.userReview !== undefined) {
			await updateDoc(doc(db, 'profiles', user.value?.uid, 'games_reviews', props.game.id.toString()), {
				text_review: textReview.value,
				collection: selected.value,
				rating: selectedRate.value
			})

			await updateDoc(doc(db, 'games', props.game.id.toString(), 'reviews', props.userReview.doc_id), {
				text_review: textReview.value,
				collection: selected.value,
				rating: selectedRate.value
			})
		}

		isLoading.value = false
		emits('update:isModal', false)
		isRateModal.value = false
	} catch (error) {
		throw error
	}
}

</script>

<template>
	<UModal v-model="value">
		<UCard>
			<template #header>
				<div class="flex justify-between items-center">
					<h1 class="text-lg font-semibold">Add game to</h1>

					<UButton @click="$emit('update:isModal', false)" icon="i-heroicons-x-mark-20-solid" size="sm" color="primary"
						square variant="solid" />
				</div>
			</template>

			<div class="flex flex-col gap-3">
				<UButton size="lg" @click="selected = 'want'" block label="Want"
					:variant="selected === 'want' ? 'solid' : 'outline'" icon="i-heroicons-bookmark" />
				<UButton size="lg" @click="selected = 'playing'" block label="Plaing"
					:variant="selected === 'playing' ? 'solid' : 'outline'" icon="i-heroicons-clock" />
				<UButton size="lg" @click="selected = 'beaten'" block label="Beaten"
					:variant="selected === 'beaten' ? 'solid' : 'outline'" icon="i-heroicons-flag" />
			</div>

			<template #footer>
				<UButton v-if="selected === 'want'" block label="Add" :disabled="selected !== 'want'" />
				<UButton v-else block label="Continue" @click="isRateModal = true" :disabled="selected === null" />

				<UModal :transition="false" v-model="isRateModal">
					<UCard>
						<template #header>
							<UButton @click="isRateModal = false" icon="i-heroicons-x-mark-20-solid" size="sm" color="primary" square
								variant="solid" />
						</template>

						<div>
							<!-- <h1 class="text-xl font-semibold">Diablo 4</h1> -->

							<div class="mb-3">
								<h2 class="text-lg font-medium mb-2">Rate this game!</h2>
								<ul class="grid grid-cols-11 gap-2">
									<UButton block v-for="(rate, idx) in rateScale" @click="selectedRate = rate"
										:icon="rate === '' ? 'i-heroicons-no-symbol-20-solid' : ''"
										:variant="selectedRate === rate ? 'solid' : 'outline'" :idx="idx" :label="rate" class="" />
								</ul>
							</div>

							<UTextarea v-model="textReview" placeholder="Write a review" :rows="5" />
						</div>

						<template #footer>
							<UButton v-if="userReview" @click="editGameReview()" :loading="isLoading" label="Edit" size="sm" color="primary" block variant="solid" />
							<UButton v-else @click="addGameReview()" :loading="isLoading" label="Add" size="sm" color="primary" block
								variant="solid" />
						</template>

					</UCard>
				</UModal>
			</template>
		</UCard>
	</UModal>
</template>