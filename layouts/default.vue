<template>
	<div class="bg-[url('~/assets/img/noise.webp')] w-full h-full fixed -z-10">
	</div>
	<NuxtLoadingIndicator />
	<div
		class="border-b border-color fixed w-full z-50 bg-white/80 backdrop-blur-none backdrop-blur-xl dark:bg-cool-900/75 ">
		<NavBar class="max-w-[1200px] mx-auto px-4" />
	</div>
	<div class="default max-w-[1200px] mx-auto px-4">
		<div class="pt-24">
			<slot />
		</div>
	</div>
</template>