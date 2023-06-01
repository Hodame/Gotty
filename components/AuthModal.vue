<script setup lang="ts">
const props = defineProps<{
	isModal: boolean
}
>()

const emits = defineEmits<{
	(e: 'update:isModal', v: boolean): void
}>()

const value = computed({
	get() {
		return props.isModal
	},
	set(value: boolean) {
		emits('update:isModal', value)
	}
})

</script>

<template>
	<UModal v-model="value">
		<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex justify-between items-center">
					<h1 class="text-lg font-semibold">Create an account</h1>

					<UButton @click="$emit('update:isModal', false)" icon="i-heroicons-x-mark-20-solid" size="sm" color="primary" square variant="solid" />
				</div>
			</template>

			<div class="flex flex-col gap-3">
				<UFormGroup label="Email">
					<UInput size="lg" placeholder="you@example.com" icon="i-heroicons-envelope" />
				</UFormGroup>

				<UFormGroup label="Password" help="Password must be at least 6 characters">
					<UInput size="lg" placeholder="*******" icon="i-heroicons-lock-closed" />
				</UFormGroup>

				<UFormGroup label="Nickname">
					<UInput size="lg" placeholder="Jake" icon="i-heroicons-user" />
				</UFormGroup>

				<UButton size="lg" label="Create an account" />
			</div>

			<template #footer>
				<span>Already have an account?</span>
				<span>
					<UButton label="Login here" variant="link" />
				</span>
			</template>
		</UCard>
	</UModal>
</template>