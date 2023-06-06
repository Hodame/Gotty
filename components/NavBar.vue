<script setup lang="ts">
import { PageableList, GameCardInfo } from '~/global';

const supabase = useSupabaseClient()

const isDark = useDark()
const isAuthModal = ref(false)
const isLoginModal = ref(false)
const isSearchModal = ref(false)
const isAuth = ref(false)
const user = useUser()

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
		icon: 'i-fluent-preview-link-16-regular',
	}],
	[{
		label: 'Settings',
		icon: 'i-heroicons-adjustments-vertical-solid',
	},
	{
		label: 'Dark mode',
		icon: isDark.value ? 'i-heroicons-moon' : 'i-heroicons-sun-20-solid',
		click: () => isDark.value = !isDark.value,
	}],
	[{
		label: 'Login out',
		icon: 'i-heroicons-arrow-right-on-rectangle-solid',
		click: () => supabase.auth.signOut()
	}]
])

function openLoginModal() {
	isLoginModal.value = true
	isAuthModal.value = false
}

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
	<div class="navbar items-center flex justify-between py-3">
		<div class="navbar__logo flex items-center">
			<NuxtLink to="/">
				<img src="~/assets/icons/Logo.svg" alt="Gotty Logo" class="h-6 mr-5">	
			</NuxtLink>		
		</div>

		<ul class="flex font-medium gap-6">
			<div>
				<UButton @click="isSearchModal = true" label="Search" variant="ghost" icon="i-heroicons-magnifying-glass-20-solid"
					size="xs" />

				<UModal v-model="isSearchModal">
					<ModalsSearch @close-modal="isSearchModal = false" />
				</UModal>
			</div>
			<UButton size="xs" to="/" label="Main" :variant="$route.path === '/' ? 'soft' : 'ghost'" icon="i-heroicons-home" />
			<UButton size="xs" to="/profile" label="Profile" :variant="$route.path === '/profile' ? 'soft' : 'ghost'" icon="i-heroicons-user" />
		</ul>

		<div>
			<div v-if="!isAuth">
				<div class="min-w-[160px] flex justify-end">
					<UButton @click="isAuthModal = !isAuthModal" label="Sign up" class="h-9"/>
				</div>

				<ModalsAuth v-model:is-modal="isAuthModal" @is-login-modal="openLoginModal" />
				<ModalsLogin v-model:is-modal="isLoginModal" />
			</div>

			<div v-else class="navbar__user flex items-center justify-center gap-2">
				<UDropdown :items="userSettings" class="flex items-center">
					<div class="flex items-center space-x-2">
						<UAvatar size="sm" :src="user.user_metadata.avatar" :alt="user.user_metadata.nickname" />
						<div class="font-medium dark:text-white">
							<div class="text-sm">{{ user.user_metadata.nickname }}</div>
							<div class="text-xs text-gray-500 dark:text-gray-400">Joined in {{ useDateFormat(user.created_at, 'MMMM YYYY', { locales: 'en-US'}).value }}</div>
						</div>
					</div>
				</UDropdown>
			</div>
		</div>
	</div>
</template>