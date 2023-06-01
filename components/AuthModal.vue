<script setup lang="ts">
const { $yup } = useNuxtApp()

const props = defineProps<{
	isModal: boolean
}
>()

const emits = defineEmits<{
	(e: 'update:isModal', v: boolean): void
}>()

const supabase = useSupabaseClient()

const loading = ref(false)

const authShema = $yup.object({
	Email: $yup.string().required(),
	Password: $yup.string().required().min(6),
	Nickname: $yup.string().required()
})

const value = computed({
	get() {
		return props.isModal
	},
	set(value: boolean) {
		emits('update:isModal', value)
	}
})

async function register(values: any) {
	loading.value = true

	const { data, error } = await supabase.auth.signUp({
		email: values.Email, password: values.Password, options: {
			data: {
				nickname: values.Nickname
			}
		}
	})

	loading.value = false

	if(data) {
		console.log(data.user);
	}

	if(error) {
		
	}
}



</script>

<template>
	<UModal v-model="value">
		<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex justify-between items-center">
					<h1 class="text-lg font-semibold">Create an account</h1>

					<UButton @click="$emit('update:isModal', false)" icon="i-heroicons-x-mark-20-solid" size="sm" color="primary"
						square variant="solid" />
				</div>
			</template>

			<Form v-slot="{ values }" class="flex flex-col gap-3" @submit="register" :validation-schema="authShema">
				<Field v-slot="{ field, errorMessage }" name="Email" >
					<UFormGroup label="Email" :error="errorMessage">
						<UInput v-bind="field" size="lg" placeholder="you@example.com" icon="i-heroicons-envelope" />
					</UFormGroup>
				</Field>

				<Field v-slot="{ field, errorMessage }" name="Password">
					<UFormGroup label="Password" help="Password must be at least 6 characters" :error="errorMessage">
						<UInput v-bind="field" size="lg" placeholder="*******" icon="i-heroicons-lock-closed" />
					</UFormGroup>
				</Field>

				<Field v-slot="{ field, errorMessage }" name="Nickname">
					<UFormGroup label="Nickname" :error="errorMessage">
						<UInput v-bind="field" size="lg" placeholder="Jake" icon="i-heroicons-user" />
					</UFormGroup>
				</Field>

				<UButton :loading="loading" type="submit" size="lg" label="Create an account" />
			</Form>

			<template #footer>
				<span>Already have an account?</span>
				<span>
					<UButton label="Login here" variant="link" />
				</span>
			</template>
		</UCard>
</UModal></template>