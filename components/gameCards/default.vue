<script setup lang="ts">
import { GameCardInfo } from '~/global';


defineProps<{
	gameInfo: GameCardInfo
}>()
</script>

<template>
	
<div class="max-w-xs bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <div>
        <img class="rounded-t-lg w-full aspect-3-3 object-cover" :src="gameInfo.background_image" alt="" />
    </div>

    <div class="p-5">
        <div>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ gameInfo.name }}</h5>
        </div>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
    </div>
</div>

</template>