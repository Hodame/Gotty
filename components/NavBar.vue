<script setup lang="ts">
import Auth from '~/pages/auth.vue';
import AuthModal from './AuthModal.vue';


const isDark = useDark()
const isAuth = ref(false)
const tabs = ref([
	'Main',
	'Profile',
	'Settings'
])

const userInfo = ref([
	[{
		label: 'Profile',
		avatar: {
			src: 'https://avatars.githubusercontent.com/u/739984?v=4'
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
	}]
])
</script>

<template>
	<div class="navbar items-center flex justify-between py-4 border-b border-color">
		<div class="navbar__logo flex items-center">
			<UInput variant="outline" icon="i-heroicons-magnifying-glass-20-solid" size="sm" color="gray" :trailing="false" />
		</div>

		<div class="navbar__tabs flex gap-4">
			<UButton variant="ghost" v-for="(tab, idx) in tabs" :key="idx" class="navbar__tab ">
				{{ tab }}
			</UButton>
		</div>

		<div>
			<UButton @click="isAuth = !isAuth" label="Open modal"/>

			<AuthModal v-model:is-modal="isAuth" />
		</div>

		<div class="navbar__user flex items-center justify-center gap-2">
			<UDropdown :items="userInfo" class="flex items-center">
				<div class="flex items-center space-x-2">
					<img class="w-10 h-10 rounded-full object-cover"
						src="https://android-obzor.com/wp-content/uploads/2022/03/28e4ac42f547e6ac0f50f7cfa916ca93.jpg"
						alt="use-avatar">
					<div class="font-medium dark:text-white">
						<div>Jese Leos</div>
						<div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
					</div>
				</div>
			</UDropdown>
		</div>
	</div>
</template>