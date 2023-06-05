<script setup lang="ts">
import { UseImage } from '@vueuse/components';
import { GameInfoAll } from '~/global';


defineProps<{
    gameInfo: GameInfoAll
}>()
</script>

<template>
    <div
        class="h-[320px] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden pb-5 cursor-pointer">
        <div class="h-44">
            <UseImage v-if="gameInfo.background_image" :src="gameInfo.background_image" :alt="gameInfo.name"
                class="rounded-t-lg h-full w-full aspect-3-3 object-cover">
                <template #loading>
                    <USkeleton class="w-full h-full border-b border-color" />
                </template>
            </UseImage>
            <div v-else class="w-full h-full border-b border-color flex justify-center items-center">
                <UIcon name="i-heroicons-photo" class="w-11 h-11 bg-primary" />
            </div>
            <div class="top-3 right-3 absolute bg-red-500/50 px-2.5 py-1 rounded-md backdrop-blur-sm">
                <span class="font-medium text-sm  text-red-200 leading-none">
                    1
                </span>
            </div>
        </div>

        <div class="p-5 max-h-full overflow-hidden">
            <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2"
                    :title="gameInfo.name">{{ gameInfo.name }}</h5>
            </div>
            <div>
                <ul>
                    <li v-for="(genre, idx) in gameInfo.genres" :key="idx"
                        class="inline font-normal text-gray-700 dark:text-gray-400">
                        <UBadge :label="genre.name" class="mx-1 mb-1">
                        </UBadge>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>