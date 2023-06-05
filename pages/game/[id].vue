<script setup lang="ts">
import { _backgroundColor } from '#tailwind-config/theme';
import { GameInfoAll } from '~/global';

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const gameId = ref(route.params.id)

const { data: game, pending} = useLazyFetch<GameInfoAll>(() => `${runtimeConfig.public.baseUrl}/${gameId.value}`, {
  params: {
    key: runtimeConfig.public.apiKey,
  }
})

console.log(useDateFormat(game?.value?.released, 'MMM D, YYYY', { locales: 'en-US' }).value);

</script>

<template>
  <div v-if="pending" class="my-6">
    <div>
      <USkeleton class="w-[350px] h-[50px]"/>
      <USkeleton class="w-[50px] h-[36px] my-3"/>
    </div>

    <div class="grid grid-cols-[1fr_200px] gap-10">
      <div>
        <USkeleton class="w-full h-[535px] rounded-3xl"/>
  
        <div class="my-5">
          <USkeleton v-for="load in 5" class="w-full h-6 my-2"/>
          <USkeleton class="w-44 h-6 my-2"/>
        </div>
      </div>
      <div>
        <div v-for="x in 6" class="my-4">
          <USkeleton class="h-6 w-full"/>
          <USkeleton class="h-5 w-28 my-3"/>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="my-6">
    <div>
      <h1 class="text-5xl font-semibold">{{ game?.name }}</h1>
      <p class="text-3xl font-medium my-3">{{ game?.metacritic }}</p>
    </div>

    <div class="grid grid-cols-[1fr_200px] gap-10">
      <div>
          <div class="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img :src="game?.background_image" alt="screenshots" class="aspect-[16/9] object-cover">
          </div>

        <div class="my-5 text-lg">
          <p v-html="game?.description"></p>
        </div>
      </div>

      <GamePageInfo :game="game"/>
    </div>
</div></template>