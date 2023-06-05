<script setup lang="ts">
const user = useUser()

const infoCard = ref(['Games', 'Playing', 'Want', 'Beaten'])
const discord = ref('hodame4523')

const { copy, text, copied } = useClipboard({ source: discord})
</script>

<template>
	<div>
		<div class="grid grid-cols-[1fr,1.5fr]">
			<div class="flex gap-3">
				<UAvatar size="xl" :src="user.user_metadata.avatar" :alt="user.user_metadata.nickname"/>
				<div>
					<p class="text-2xl font-semibold">{{ user.user_metadata.nickname }}</p>
					<div class="flex">
						<div class="relative">
							<UTooltip :text="discord">						
									<UButton @click="copy(discord)" size="xs" color="white" variant="ghost" icon="i-bi-discord"/>
									<span v-if="copied" class="absolute top-0 -left-[50%] border border-color text-xs color-primary z-50 rounded-lg font-semibold p-1 bg-white dark:bg-cool-900">Copied</span>
							</UTooltip>
						</div>
						<UButton size="xs" color="white" variant="ghost" icon="i-bi-steam"/>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-4 gap-3">
					<div v-for="(card, idx) in infoCard" :key="idx" class="p-2 border border-color rounded-xl w-full bg-gray-100/30 dark:bg-white/5">
						<h1 class="text-lg font-semibold text-center">{{ card }}</h1>
						<p class="text-xl font-bold text-center">204</p>
					</div>
			</div>
		</div>
	</div>
</template>