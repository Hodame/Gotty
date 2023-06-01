<script setup lang="ts">
import { GameCardInfo } from '~/global';


defineProps<{
    gameInfo: GameCardInfo
}>()
</script>

<template>
    <div
        class="max-w-xs max-h-[366px] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden pb-5 cursor-pointer">
        <div class="h-44">
            <img class="rounded-t-lg h-full w-full aspect-3-3 object-cover" :src="gameInfo.background_image" alt="" />
        </div>

        <div class="p-5 max-h-full overflow-hidden">
            <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ gameInfo.name }}</h5>
            </div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span class="text-ellipsis overflow-hidden line-clamp-4">Here are the biggest enterprise technology
                    acquisitions of 2021 so far, in reverse chronological ordfer.
                </span>
            </p>
        </div>
    </div>
</template>