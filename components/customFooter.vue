<template>
	<footer class="flex justify-between">
		<div>
			<img src="~/assets/icons/Logo.svg" alt="Gotty" class="h-9 mb-1">
		</div>
		<div class="flex items-center">
			<UButton to="https://github.com/Hodame/Gotty/tree/main" target="_blank" icon="i-bi-github" size="xs" variant="link" color="gray"/>
			<span class="w-1 h-1 rounded-full bg-gray-500 ml-1 mr-3"></span>
			<p class="text-xs text-gray-500 dark:text-gray-300">inspired by <a
					href="https://play.google.com/store/apps/details?id=io.stashteam.games.tracker.stashapp&hl=ru&pli=1"
					target="_blank" class="text-yellow-500 dark:text-yellow-300 hover:underline hover:text-cyan-400">Stash
				</a>
			</p>
		</div>
	</footer>
</template>