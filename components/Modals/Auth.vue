<script setup lang="ts">
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

type RegsiterForm = {
	email: string
	password: string
	username: string
}

const { $yup } = useNuxtApp()
const auth = useFirebaseAuth()!
const props = defineProps<{
	isModal: boolean
}
>()
const emits = defineEmits<{
	(e: 'update:isModal', v: boolean): void
	(e: 'IsLoginModal'): void
}>()

const loading = ref(false)

const authShema = $yup.object({
	email: $yup.string().required('Please enter your email'),
	password: $yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters'),
	username: $yup.string().required('Please enter your username')
})

const value = computed({
	get() {
		return props.isModal
	},
	set(value: boolean) {
		emits('update:isModal', value)
	}
})

const { errors, handleSubmit, setErrors } = useForm<RegsiterForm>({
	initialValues: { email: '', password: '', username: '' },
	validationSchema: authShema,
})

const { value: email } = useField<string>('email',)
const { value: password } = useField<string>('password',)
const { value: username } = useField<string>('username',)


const register = handleSubmit(async function register(values: any) {
	try {
		loading.value = true
		await createUserWithEmailAndPassword(auth, email.value, password.value)
		.then( async (user) => {
			await updateProfile(user.user, {
				displayName: username.value
			})
		})
		emits('update:isModal', false)
	} catch (error) {
		throw error
	}
	finally { 
		loading.value = false
	}
	// if (error) {
	// 	if (error.message === 'Unable to validate email address: invalid format') setErrors({ email: 'Please enter a valid email' })
	// 	else if (error.message === 'User already registered') setErrors({ email: 'This email is alredy used' })
	// 	console.log(error.message);
	// }
})
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

			<form class="flex flex-col gap-3" @submit.prevent="register">
				<UFormGroup label="Email" :error="errors.email">
					<UInput v-model="email" size="lg" placeholder="you@example.com" icon="i-heroicons-envelope" />
				</UFormGroup>

				<UFormGroup label="Password" help="Password must be at least 6 characters" :error="errors.password">
					<UInput v-model="password" name="password" size="lg" placeholder="*******" icon="i-heroicons-lock-closed" />
				</UFormGroup>

				<UFormGroup label="username" :error="errors.username">
					<UInput v-model="username" name="username" size="lg" placeholder="Jake" icon="i-heroicons-user" />
				</UFormGroup>

				<UButton block :loading="loading" type="submit" size="lg" label="Create an account" />
			</form>

			<template #footer>
				<span>Already have an account?</span>
				<span>
					<UButton @click="$emit('IsLoginModal')" label="Login here" variant="link" />
				</span>
			</template>
		</UCard>
	</UModal>
</template>