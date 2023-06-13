<script setup lang="ts">
import type { Review } from "@/global";
import { Profile } from "~/types/profiles";

const props = defineProps<{
	review: Review
}>()
</script>

<template>
	<div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700" v-if="review.text_review !== ''">
		<div class="flex justify-between items-center mb-2">
			<div class="flex items-center overflow-hidden flex-1 mr-3">
				<UAvatar size="lg" :src="review.user.avatar" :alt="review.user.nickname" class="border border-color mr-2" />
				<span class="text-ellipsis overflow-hidden text-lg">{{ review.user.nickname ? review.user.nickname : 'pidaras' }}</span>
			</div>

			<div class="flex items-center mt-1">
				<UIcon name="i-heroicons-star" class="mr-1" />
				<span>{{ review.rating }}</span>
			</div>	
		</div>

		<p class="mb-3 font-normal text-gray-700 overflow-hidden max-h-[192px] dark:text-gray-400"><span
				class="text-ellipsis overflow-hidden line-clamp-4 break-words	">{{ review.text_review }}</span></p>

		<div class="flex justify-between items-center gap-3">
			<UButton label="Read more" class="mr-1" />

			<div>
				<div v-if="review.collection === 'playing'" class="flex items-center gap-1">
					<UIcon name="i-heroicons-clock"/>
					<span>{{ review.collection }}</span>
				</div>
				<div v-if="review.collection === 'beaten'" class="flex items-center gap-1">
					<UIcon name="i-heroicons-flag"/>
					<span>{{ review.collection }}</span>
				</div>

			</div>
		</div>

	</div>
</template>