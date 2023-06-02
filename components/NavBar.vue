<script setup lang="ts">
const supabase = useSupabaseClient()

const isDark = useDark()
const isAuthModal = ref(false)
const isAuth = ref(false)
const user = useUser()
const tabs = ref([
	'Main',
	'Profile',
	'Settings'
])

const userSettings = ref([
	[{
		label: 'Profile',
		avatar: {
			src: user.value.user_metadata.avatar,
			alt: user.value.user_metadata.nickname
		}
	}],
	[{
		label: 'Games',
		icon: 'i-heroicons-rectangle-stack'
	}, {
		label: 'Reviews',
		icon: 'i-fluent-preview-link-16-regular'
	}],
	[{
		label: 'Settings',
		icon: 'i-heroicons-adjustments-vertical-solid',
	},
	{
		label: 'Dark mode',
		icon: isDark ? 'i-heroicons-moon' : 'i-heroicons-sun-20-solid',
		click: () => isDark.value = !isDark.value
	}],
	[{
		label: 'Login out',
		icon: 'i-heroicons-arrow-right-on-rectangle-solid',
		click: () => supabase.auth.signOut()
	}]
])

supabase.auth.onAuthStateChange((event, session) => {
	if (session !== null) {
		isAuth.value = true
		user.value = session.user
	}
	else {
		isAuth.value = false
		user.value = {
			email: '',
			user_metadata: {
				nickname: '',
				avatar: ''
			},
			id: "",
			app_metadata: {

			},
			aud: "",
			created_at: ""
		}
	}
})
</script>

<template>
	<div class="navbar items-center flex justify-between py-4 border-b border-color">
		<div class="navbar__logo flex items-center">
			<UInput variant="outline" icon="i-heroicons-magnifying-glass-20-solid" size="sm" color="gray" :trailing="false" />
		</div>

		<div class="navbar__tabs flex gap-4">
			<UButton :to="{ path: '/'}" variant="ghost" class="navbar__tab ">
				Main
			</UButton>

			<UButton :to="{ path: '/profile'}" variant="ghost" class="navbar__tab ">
				Profile
			</UButton>
		</div>

		<div>
			<div v-if="!isAuth">
				<UButton @click="isAuthModal = !isAuthModal" label="Sign up" />

				<AuthModal v-model:is-modal="isAuthModal" />
			</div>

			<div v-else class="navbar__user flex items-center justify-center gap-2">
				<UDropdown :items="userSettings" class="flex items-center">
					<div class="flex items-center space-x-2">
						<UAvatar size="md" :src="user.user_metadata.avatar" :alt="user.user_metadata.nickname" />
						<div class="font-medium dark:text-white">
							<div>{{ user.user_metadata.nickname }}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
						</div>
					</div>
				</UDropdown>
			</div>
		</div>
	</div>
</template>