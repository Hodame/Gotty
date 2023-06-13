<script setup lang="ts">
import { signInWithEmailAndPassword } from 'firebase/auth';

const auth = useFirebaseAuth()!

type LoginForm = {
	email: string
	password: string
}

const props = defineProps<{
	isModal: boolean
}
>()
const emits = defineEmits<{
	(e: 'update:isModal', v: boolean): void
}>()

const { $yup } = useNuxtApp()

const loading = ref(false)

const authShema = $yup.object({
	email: $yup.string().required('Please enter your email'),
	password: $yup.string().required('Please enter your password'),
})

const value = computed({
	get() {
		return props.isModal
	},
	set(value: boolean) {
		emits('update:isModal', value)
	}
})

const { errors, handleSubmit } = useForm<LoginForm>({
	initialValues: { email: '', password: '' },
	validationSchema: authShema,
})

const { value: email, setErrors } = useField<string>('email',)
const { value: password } = useField<string>('password',)

const login = handleSubmit(async function (values: any) {
	try {
		loading.value = true
		await signInWithEmailAndPassword(auth, values.email, values.password)
		emits('update:isModal', false)
	} catch (error) {
		throw error
	}
	finally {
		loading.value = false
	}

	// if (data.user !== null) {
	// 	console.log(data);
	// 	emits('update:isModal', false)
	// }

	// if (error) {
	// 	setErrors('Wrong password or email')
	// }
})
</script>

<template>
	<UModal v-model="value">
		<UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex justify-between items-center">
					<h1 class="text-lg font-semibold">Login</h1>

					<UButton @click="$emit('update:isModal', false)" icon="i-heroicons-x-mark-20-solid" size="sm" color="primary"
						square variant="solid" />
				</div>
			</template>

			<form class="flex flex-col gap-3" @submit.prevent="login">
				<UFormGroup label="Email" :error="errors.email">
					<UInput v-model="email" size="lg" placeholder="you@example.com" icon="i-heroicons-envelope" />
				</UFormGroup>

				<UFormGroup label="Password" :error="errors.password">
					<UInput v-model="password" name="password" size="lg" placeholder="*******" icon="i-heroicons-lock-closed" />
				</UFormGroup>

				<UButton block :loading="loading" type="submit" size="lg" label="Login" />
			</form>

			<template #footer>
				<p class="text-center">
					<UButton label="Forget password?" variant="link" />
				</p>
			</template>
		</UCard>
	</UModal>
</template>