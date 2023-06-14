<template>
	<div class="flex flex-col h-screen">
		<div class="dark:bg-[url('~/assets/img/noise.webp')] w-full h-full fixed -z-10">
		</div>
		<NuxtLoadingIndicator color="#22d3ee"/>
		<div
			class="border-b border-color fixed w-full z-50 bg-white/80 backdrop-blur-none backdrop-blur-xl dark:bg-cool-900/75 ">
			<NavBar class="max-w-[1200px] mx-auto px-4" />
		</div>
		<div class="default max-w-[1200px] w-full mx-auto px-4 flex-auto">
			<div class="pt-24">
				<slot />
			</div>
		</div>
		<div class="dark:border-t border-color w-full py-4 bg-white/80 dark:bg-gray-800">
			<CustomFooter class="max-w-[1200px] mx-auto"/>
		</div>
	</div>
</template>